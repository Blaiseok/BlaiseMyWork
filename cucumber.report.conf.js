const report = require('multiple-cucumber-html-reporter'); // eslint-disable-line

function addCIMetadata(customData) {
  return customData;
}

const customData = {
  title: 'Run info',
  data: [
    {
      label: 'Project',
      value: 'Blaise --- esting-assignment'
    },
    {
      label: 'Generated on:',
      value: new Date().toString()
    },
    {
      label: 'Reporter:',
      value: '<a href="https://www.volvocars.com/intl/v/car-safety/a-million-more" ' +
        'target="_blank">cucumber-reporter</a>'
    },
  ]
};

report.generate({
  jsonDir: './report/cucumber/',
  reportPath: './report/cucumber/html',
  displayDuration: true,
  removeFolders: true,

  pageTitle: 'Blaise --- esting-assignment',
  reportName: 'Blaise --- esting-assignment',
  openReportInBrowser: true,
  pageFooter:
    '<div class="created-by"><p>&copy; Blaise --- esting-assignment</p></div>',

  customData: addCIMetadata(customData),
});

