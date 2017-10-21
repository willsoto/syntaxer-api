const _ = require('lodash');
const plist = require('plist');

class SublimeConverter {
  constructor(tmTheme) {
    this.tmThemeObject = plist.parse(tmTheme);

    this.result = {
      general: {},
      scopes: []
    };
  }

  convert() {
    for (const scope in this.generalSettings) {
      const setting = this.generalSettings[scope];

      this.result.general[scope] = {
        scope: scope,
        color: setting
      };
    }

    this.result.scopes = _.map(this.languageSettings, this.generateScopeFromSetting);

    return this.result;
  }

  get settings() {
    return this.tmThemeObject.settings;
  }

  get generalSettings() {
    return this.settings[0].settings;
  }

  get languageSettings() {
    return _.tail(this.settings);
  }

  generateScopeFromSetting(setting) {
    const { settings } = setting;
    const { fontStyle } = settings;
    const font = {
      italic: false,
      bold: false,
      underline: false
    };

    if (fontStyle) {
      if (fontStyle.indexOf('italic') > -1) {
        font.italic = true;
      }

      if (fontStyle.indexOf('bold') > -1) {
        font.bold = true;
      }

      if (fontStyle.indexOf('underline') > -1) {
        font.underline = true;
      }
    }

    return {
      name: setting.name,
      scope: setting.scope,
      styles: {
        ...font,
        foreground: settings.foreground,
        background: settings.background || ''
      }
    };
  }
}

module.exports = SublimeConverter;
