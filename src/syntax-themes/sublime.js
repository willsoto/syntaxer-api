const url = require('url');
const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const express = require('express');
const Git = require('nodegit');

const logger = require('../logger');
const SublimeConverter = require('../converters/sublime');

const router = express.Router();

router.get('/', async function(req, res) {
  const { query } = req;
  const repoUrl = url.parse(query.repo);
  const orgRepo = _.trimStart(repoUrl.pathname, '/');
  const repoPath = path.normalize(orgRepo);
  const clonePath = path.join('tmp', repoPath);
  let repo;

  logger.log({
    level: 'info',
    message: `Attempting to clone ${repoPath} into ${clonePath}`
  });

  if (!fs.existsSync(clonePath)) {
    try {
      repo = await Git.Clone(query.repo, clonePath);
    } catch (e) {
      return res.status(404).json({
        response: 'Not found'
      });
    }
  } else {
    repo = await Git.Repository.open(clonePath);
  }

  try {
    await repo.fetch('origin');

    const master = await repo.getHeadCommit();
    const entry = await master.getEntry('schemes/Material-Theme-Darker.tmTheme');
    const blob = await entry.getBlob();

    const converter = new SublimeConverter(blob.toString());

    res.json({
      theme: converter.convert()
    });
  } catch (e) {
    return res.status(500).json({
      response: e.message
    });
  }
});

module.exports = router;
