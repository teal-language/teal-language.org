const loaderCode = `

local use_alert = false

package.path = "./?.lua"
local _os = os
os = {
  getenv = function(var)
      return nil
  end,
}
io = setmetatable({
  stderr = {
    write = function(_, ...)
      print(...)
    end,
  },
}, {
  __index = function(t, k)
    error(tostring(k))
  end
})

local tl = require('tl')

env = env or tl.init_env(false, false, true)
local output, result = tl.gen(%input%, env)

local function check_errors(errors, header)
  if not errors or #errors == 0 then
    return true
  end

  local js = require("js")
  local out = {"[Teal] " .. header .. ":"}
  for _, err in ipairs(errors) do
    table.insert(out, tostring(err.y) .. ":" .. tostring(err.x) .. ": " .. err.msg)
  end
  local errmsg = table.concat(out, "\\n")
  if use_alert then
    js.global.window:alert(errmsg)
  else
    print(errmsg)
  end
  return false
end

local ok
ok = check_errors(result.syntax_errors, "syntax errors")
ok = ok and check_errors(result.type_errors, "type errors")
if not ok then
  return
end

load(output)()
`

var scriptTags = document.querySelectorAll('script[type="application/teal"]');
for (var i=0; i < scriptTags.length; i++) {
    let tealCode = scriptTags[i].innerHTML;
    try {
      fengari.load(loaderCode.replace("%input%", JSON.stringify(tealCode)))();
    } catch (err) {
      window.alert(err);
    }
}
