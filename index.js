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
  const remove_prefix = core.getInput("removePrefix");

  for (const key in variables) {
    if (key.startsWith(values_prefix)) {
      const replaced_key = (remove_prefix == "true") ? key.replace(values_prefix + '_', '') : key
      core.exportVariable(replaced_key, variables[key]);
    }
  }
} catch ({message}) {
  core.setFailed(message);
}
