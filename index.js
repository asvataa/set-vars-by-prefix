const core = require('@actions/core');

function getVars(vars) {
  if (typeof vars === "string") {
    try {
      return JSON.parse(vars);
    } catch (err) {
      return vars;
    }
  }
  return vars;
}

try {
  const variables = getVars(core.getInput("variables", { required: true }));
  const values_prefix = core.getInput("varsPrefix");

  for (const key in variables) {
    if (key.startsWith(values_prefix)) {
      core.exportVariable(key, variables[key]);
    }
  }
} catch ({message}) {
  core.setFailed(message);
}
