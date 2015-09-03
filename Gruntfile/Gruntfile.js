var fs = require('fs');

module.exports = function(grunt){
    grunt.registerTask('version', function (what) {
     
        // map name to index and default to patch index
        var index = ['major', 'minor', 'patch'].indexOf(what);
     
        var tiapp = fs.readFileSync('tiapp.xml', {
            encoding: 'utf-8'
        });
     
        if (index !== -1) {
            // App Version
            tiapp = tiapp.replace(/(<version>)([^< ]+)(<\/version>)/, function (match, before, version, after) {
                version = version.split('.');
     
                // bump index and reset following
                for (var i = index; i <= 2; i++) {
                    version[i] = (i === index) ? (parseInt(version[i], 10) + 1).toString() : '0';
                }
     
                version = version.join('.');
     
                grunt.log.writeln('Bumped version to: ' + version);
     
                return before + version + after;
            });
            
            // Android
            tiapp = tiapp.replace(/(android:versionName=")([^"]+)(")/, function (match, before, versionName, after) {
                versionName = versionName.split('.');
         
                // bump index and reset following
                for (var i = index; i <= 2; i++) {
                    versionName[i] = (i === index) ? (parseInt(versionName[i], 10) + 1).toString() : '0';
                }
     
                versionName = versionName.join('.');
     
                grunt.log.writeln('Bumped versionName to: ' + versionName);
     
                return before + versionName + after;
            });

            // iOS
            tiapp = tiapp.replace(/(<key>CFBundleShortVersionString<\/key>\s*<string>)([^< ]+)(<\/string>)/mg, function (match, before, CFBundleShortVersionString, after) {
                CFBundleShortVersionString = CFBundleShortVersionString.split('.');
         
                // bump index and reset following
                for (var i = index; i <= 2; i++) {
                    CFBundleShortVersionString[i] = (i === index) ? (parseInt(CFBundleShortVersionString[i], 10) + 1).toString() : '0';
                }
     
                CFBundleShortVersionString = CFBundleShortVersionString.join('.');
     
                grunt.log.writeln('Bumped CFBundleShortVersionString to: ' + CFBundleShortVersionString);
     
                return before + CFBundleShortVersionString + after;
            });
        }

        grunt.log.writeln('================\nAndroid\n================');
     
        tiapp = tiapp.replace(/(android:versionCode=")([^"]+)(")/, function (match, before, versionCode, after) {
            versionCode = parseInt(versionCode, 10) + 1;
     
            grunt.log.writeln('Bumped android:versionCode to: ' + versionCode);
     
            return before + versionCode + after;
        });


        grunt.log.writeln('================\niOS\n================');
     
        tiapp = tiapp.replace(/(<key>CFBundleVersion<\/key>\s*<string>)([^< ]+)(<\/string>)/mg, function (match, before, CFBundleVersion, after) {
            CFBundleVersion = parseInt(CFBundleVersion, 10) + 1;
     
            grunt.log.writeln('Bumped CFBundleVersion to: ' + CFBundleVersion);
     
            return before + CFBundleVersion + after;
        });
     
        fs.writeFileSync('tiapp.xml', tiapp);
    });
};
