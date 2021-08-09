const camelize = function(string) {
  string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
    return chr ? chr.toUpperCase() : '';
  });
  
  return string.substr(0, 1).toLowerCase() + string.substr(1);
};

module.exports = { camelize }