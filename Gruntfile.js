
module.exports = function(grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);

  grunt.registerMultiTask('gruntTemplate', 'Configuration', function(arg1) {
    var baseDir = commonTaskConfig.app;
    var APP_CONFIG;
    var configDir = commonTaskConfig.config;

    var readConfig = function(configFileName) {
      var filePath = configDir + '/' + 'configFileName' + '.json';
      APP_CONFIG = grunt.file.readJSON(filePath);
    };

    var includeTemplateFn = function(fileArr){
      if(!(fileArr instanceof Array)){
        fileArr = [fileArr];
      }
      var contents = "";
      var length = fileArr.length;
      for(var i = 0; i < length; i++){
        var filePath = baseDir+'/' + fileArr[i];
        contents = contents + grunt.file.read(filePath);
      }
      return contents;
    };
      
    var processFn = function(contents, filePath){
      return grunt.template.process(contents, {
        data:{
          include_template: includeTemplateFn,
          templateModule: templateModuleName,
          APP_CONFIG: APP_CONFIG
        }
      });
    };

    var copyFile = function(srcFile, targetFile){

      if(srcFile.match(partialFinderRegex)){
        grunt.log.ok('Ignoring partial file: ', srcFile);
        return;
      }
      grunt.log.ok('Copying file from ', srcFile, ' to ', targetFile);

      grunt.file.copy(srcFile, targetFile, {
        process:processFn
      });
    };

    readConfig(grunt.option("target"));

    var partialFinderRegex = new RegExp('/_.+.gtpl$', "i"),
    length = this.files.length;

    for(var i = 0; i < length; i++){
      var sources = this.files[i].src, sLength = this.files[i].src.length, targetFile = this.files[i].dest;
      for(var j = 0; j < sLength; j++){
        copyFile(sources[j], targetFile);
      }
    }

   });

  var renameGTPLregex = new RegExp('.gtpl$', "i");
  var renameRegx = new RegExp("(^dist/.tmp/app|^dist/.tmp/)", "i");



  var gruntTemplateTaskConfig = {
    gruntTemplate: {
      dist: {
        files: [
            {
              expand: true,
              cwd: 'app',
              src: '**/*.gtpl',
              dest: 'dist/.tmp',
              rename:function(dest, src){
                return dest + '/' + src.replace(renameGTPLregex, '');
              }
            }
          ]
      }
    }
  };
  var commonTaskConfig = {
    app: 'app',
    config: 'config',
    dist: 'dist'
  };

  var taskConfig = {
     pkg: grunt.file.readJSON('package.json'),
     copy: {
      live: {
        files: [{
          expand:true,
          cwd: 'app',
          src: '**/*.{js,png,jpg,jpeg,gif,css,woff,eot,svg,html,json}',
          dest: 'dist'
        }]
      }
    }
  };

  grunt.event.on('watch', function(action, filepath) {
    grunt.file.copy(filepath, "dist"+'/'+filepath.replace(new RegExp("^app","i"), "") );
    grunt.log.ok('in watch with ', action , filepath);
  });

  grunt.initConfig(grunt.util._.extend(commonTaskConfig, taskConfig, gruntTemplateTaskConfig));

  grunt.registerTask('devBuild', [ 'copy']);
  grunt.registerTask('default', ['devBuild']);
};
