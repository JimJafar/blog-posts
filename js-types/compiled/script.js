define(["assert"], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var assert = $__0.assert;
  var MyClass = function MyClass() {};
  ($traceurRuntime.createClass)(MyClass, {methodA: function(name) {
      assert.argumentTypes(name, $traceurRuntime.type.string);
      var length = assert.type(name.length, int);
      return assert.returnType((length), int);
    }}, {});
  Object.defineProperty(MyClass.prototype.methodA, "parameters", {get: function() {
      return [[$traceurRuntime.type.string]];
    }});
  return {};
});

//# sourceMappingURL=script.ats
