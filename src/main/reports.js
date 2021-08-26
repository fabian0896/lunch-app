const { ipcMain, shell } = require('electron');
// const jsreport = require('jsreport')();
const fs = require('fs');
const path = require('path');
const format = require('date-fns/format');
const renderReport = require('jsreport-module');

const es = require('date-fns/locale/es');

module.exports = function setupReports() {
  ipcMain.handle(
    'generate-report',
    async (event, dateRange, savePath, data) => {
      const templatePath = path.join(
        __dirname,
        '..',
        '..',
        'assets',
        'template',
        'report-template.html'
      );
      const helpersPath = path.join(
        __dirname,
        '..',
        '..',
        'assets',
        'template',
        'helpers.js'
      );
      const content = fs.readFileSync(templatePath, 'utf-8').toString();
      const helpers = fs.readFileSync(helpersPath, 'utf-8').toString();

      let [startDate, endDate] = dateRange;
      startDate = format(startDate, "dd 'de' MMMM 'del' yyyy", { locale: es });
      endDate = format(endDate, "dd 'de' MMMM 'del' yyyy", { locale: es });

      // eslint-disable-next-line no-underscore-dangle
      /* if (!jsreport._initialized) {
        console.log('Se va a iniciar jsreport');
        await jsreport.init();
      }

      const report = await jsreport.render({
        template: {
          content,
          helpers,
          engine: 'handlebars',
          recipe: 'html-to-xlsx',
        },
        data: {
          data,
          dateRange: [startDate, endDate],
        },
      });
      fs.writeFileSync(savePath, report.content); */

      await renderReport({
        template: content,
        helpers,
        savePath,
        data: {
          data,
          dateRange: [startDate, endDate],
        },
      });

      shell.showItemInFolder(savePath);
    }
  );
};
