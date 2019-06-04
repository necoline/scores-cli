const helpText = `
      scores [command]
  
      start .............. start reporting process
      version ............ show package version
      help ............... show help menu for a command`;

module.exports = args => {
  console.log(helpText);
};
