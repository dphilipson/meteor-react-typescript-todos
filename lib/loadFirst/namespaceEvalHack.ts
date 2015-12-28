declare var namespaceEvalHack: (namespace: string) => string;

namespaceEvalHack = function namespaceEvalHack(namespace: string) {
  return `var ${namespace} = this.${namespace} || (this.${namespace} = {})`;
};
