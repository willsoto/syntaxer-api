const url = require('url');
const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const less = require('less');
const express = require('express');
const Git = require('nodegit');

const router = express.Router();

const compileLess = async function(lessInput, clonePath) {
  let output;

  try {
    output = await less.render(lessInput, {
      paths: [clonePath, path.join(clonePath, 'styles')]
    });
  } catch (error) {
    return error;
  }

  return output;
};

router.get('/', async function(req, res) {
  const { query } = req;
  const repoUrl = url.parse(query.repo);
  const orgRepo = _.trimStart(repoUrl.pathname, '/');
  const repoPath = path.normalize(orgRepo);
  const clonePath = path.join('tmp', repoPath);
  let repo;

  // if the repo exists already, just update it
  if (fs.existsSync(clonePath)) {
    repo = await Git.Repository.open(clonePath);

    await repo.fetchAll();
    await repo.mergeBranches('master', 'origin/master');
  } else {
    // otherwise, we need to clone
    try {
      repo = await Git.Clone(query.repo, clonePath);
    } catch (e) {
      return res.status(404).json({
        response: 'Not found'
      });
    }
  }

  const master = await repo.getMasterCommit();
  const entry = await master.getEntry('index.less');
  const blob = await entry.getBlob();

  const compiled = await compileLess(blob.toString(), clonePath);

  res.json({
    compiled: compiled
  });
});

module.exports = router;
