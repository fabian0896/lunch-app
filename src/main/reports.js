const { ipcMain, shell } = require('electron');
const jsreport = require('jsreport');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const { es } = require('date-fns/locale');

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
      const content = fs.readFileSync(templatePath, 'utf-8');
      const helpers = fs.readFileSync(helpersPath, 'utf-8');

      let [startDate, endDate] = dateRange;
      startDate = format(startDate, "dd 'de' MMMM 'del' yyyy", { locale: es });
      endDate = format(endDate, "dd 'de' MMMM 'del' yyyy", { locale: es });
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
      fs.writeFileSync(savePath, report.content);
      shell.showItemInFolder(savePath);
    }
  );
};
