const { ipcMain, shell } = require('electron');
// const jsreport = require('jsreport')();
const fs = require('fs');
const path = require('path');
const renderReport = require('jsreport-module');
const client = require('jsreport-client')(
  'https://svelty-fajas.jsreportonline.net/',
  'sveltyfajas@gmail.com',
  'Fabian08*'
);

module.exports = function setupReports() {
  ipcMain.handle(
    'generate-report',
    async (event, dateRange, savePath, data) => {
      const templatePath = path.join(
        __dirname,
        '..',
        'assets',
        'template',
        'report-template.html'
      );
      const helpersPath = path.join(
        __dirname,
        '..',
        'assets',
        'template',
        'helpers.js'
      );
      const content = fs.readFileSync(templatePath, 'utf-8').toString();
      const helpers = fs.readFileSync(helpersPath, 'utf-8').toString();

      await renderReport({
        template: content,
        helpers,
        savePath,
        data: {
          data,
          dateRange,
        },
      });

      shell.showItemInFolder(savePath);
    }
  );

  ipcMain.handle(
    'generate-report-online',
    async (event, dateRange, savePath, data) => {
      const res = await client.render({
        template: {
          shortid: 'JKNpvr6TOz',
        },
        data: {
          data,
          dateRange,
        },
      });
      const bodyBufer = await res.body();
      fs.writeFileSync(savePath, bodyBufer);
      shell.showItemInFolder(savePath);
    }
  );
};
