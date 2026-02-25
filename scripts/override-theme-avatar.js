/**
 * Override Theme Avatar Generator
 * 
 * This generator ensures that the user's custom avatar.png overrides the theme's default avatar.
 * It registers the user's avatar after the theme's assets have been loaded, so the user's
 * version will be used in the final public directory.
 */

const path = require('path');

hexo.extend.generator.register('override-theme-avatar', function(locals) {
  const fs = require('hexo-fs');
  const avatarPath = path.join(hexo.base_dir, 'source/img/avatar.png');
  
  return fs.exists(avatarPath).then(exist => {
    if (!exist) {
      return [];
    }
    
    return [{
      path: 'img/avatar.png',
      data: function() {
        return fs.createReadStream(avatarPath);
      }
    }];
  });
});