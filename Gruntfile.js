'use strict';

module.exports=function(grunt){
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.registerTask('serve',function(target){
        var nodemon=grunt.util.spawn({
            cmd:'grunt',
            grunt:true,
            args:'nodemon'
        });
        nodemon.stdout.pipe(process.stdout);
        nodemon.stderr.pipe(process.stderr);

        grunt.task.run([
        'clean:server',
        'concurrent:server',
        'autoprefixer',
        'connect:livereload',
        'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'modernizr',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.initConfig({
        clean:{
            server:'.tmp'
        },

        concurrent:{
            server:[
                'sass:server',
                'copy:styles'
            ]
        },

        sass:{
            options:{
                includePaths:[
                    'bower_components'
                ]
            },
            server:{
                files:[{
                    expand:true,
                    cwd:'app/styles',
                    src:['*.scss'],
                    dest:'.tmp/styles',
                    ext:'.css'
                }]
            }
        },

        copy:{
            styles:{
                expand:true,
                dot:true,
                cwd:'app/styles',
                dest:'.tmp/styles/',
                src:'{,*/}*.css'
            }
        },

        autoprefixer:{
            options:{
                browsers:['last 1 version']
            },
        },

        connect:{
            options:{
                port:9000,
                open:true,
                livereload:35729,
                hostname:'0.0.0.0'
            },
            livereload:{
                options:{
                    middleware:function(connect){
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components',
                                connect.static('./bower_components')),
                            connect().use('/examples',
                                connect.static('./examples')),
                            connect.static('app')
                        ];
                    }
                }
            },
        },

        watch:{
            js:{
                files:['app/scripts/{,*/}*.js'],
                tasks:['jshint'],
                options:{
                    livereload:true
                }
            },
            gruntfile:{
                files:['Gruntfile.js']
            },
            sass:{
                files:['app/styles/{,*/}*.{scss,sass}'],
                tasks:['sass:server','autoprefixer']
            },
            styles:{
                files:['app/styles/{,*/}*.css'],
                tasks:['newer:copy:styles','autoprefixer']
            },
            livereload:{
                options:{
                    livereload:'<%= connect.options.livereload %>'
                },
                files:[
                    'app/{,*/}*.html',
                    'examples/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    'app/images/{,*/}*'
                ]
            }
        },

        nodemon:{
            dev:{
                script:'server.js',
                options:{
                    nodeArgs:['--debug'],
                    env:{
                        PORT:'9001'
                    }
                }
            }
        }
    });
};

