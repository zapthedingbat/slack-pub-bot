const tsc = require('typescript');
const tsConfig = require('../tsconfig.json');

function formatDiagnostic(diagnostic) {
  const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
  return `${diagnostic.messageText}\n\n${diagnostic.file.fileName}:${position.line}:${position.character}`;
}

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts')) {
      const diagnosticMessages = [];
      const outputSrc = tsc.transpile(src, tsConfig.compilerOptions, path, diagnosticMessages);
      if (diagnosticMessages.length) throw new Error(diagnosticMessages.map(formatDiagnostic));
      return outputSrc;
    }
    return src;
  }
};
