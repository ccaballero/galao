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
        'copy:fonts',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('fxos', [
        'build',
        'copy:fxos'
    ]);

    grunt.initConfig({
        clean: {
            server:'.tmp',
            dist:{
                files:[{
                    dot:true,
                    src:[
                        '.tmp',
                        'dist/*'
                    ]
                }]
            }
        },

        concurrent:{
            server:[
                'sass:server',
                'copy:styles'
            ],
            dist:[
                'sass:server',
                'copy:dist'
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
            },
            fonts:{
                expand:true,
                dot:true,
                cwd:'bower_components/font-awesome/fonts',
                src: ['**'],
                dest: 'dist/fonts'
            },
            dist:{
                files:[{
                    expand:true,
                    dot:true,
                    cwd:'app',
                    dest:'dist',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*'
                    ]
                }]
            },
            fxos:{
                files:[{
                    src:'dist/control.html',
                    dest:'dist/fxos/index.html'
                },{
                    src:'app/manifest.webapp',
                    dest:'dist/fxos/manifest.webapp'
                },{
                    expand:true,
                    cwd:'dist/fonts/',
                    src:['**'],
                    dest:'dist/fxos/fonts'
                },{
                    expand:true,
                    cwd:'dist/scripts/',
                    src:['**'],
                    dest:'dist/fxos/scripts'
                },{
                    expand:true,
                    cwd:'app/images/',
                    src:['**'],
                    dest:'dist/fxos/images'
                },{
                    expand:true,
                    cwd:'dist/styles/',
                    src:['**'],
                    dest:'dist/fxos/styles'
                }]
            }
        },

        autoprefixer:{
            options:{
                browsers:['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
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
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'app/scripts/{,*/}*.js',
                'app/scripts/vendor/*'
            ]
        },

        useminPrepare:{
            options:{
                dest:'dist'
            },
            html: 'app/control.html'
        },

        concat:{},

        cssmin: {
            dist: {
                files: {
                    'dist/styles/main.css': [
                        '.tmp/styles/palette.css',
                        '.tmp/styles/base.css',
                        '.tmp/styles/main.css'
                    ],
                    'dist/styles/control.css': [
                        '.tmp/styles/palette.css',
                        '.tmp/styles/base.css',
                        '.tmp/styles/overlay.css',
                        '.tmp/styles/control.css'
                    ]
                }
            }
        },

        uglify: {},

        rev:{
            dist:{
                files:{
                    src:[
                        'dist/scripts/{,*/}*.js',
                        'dist/styles/{,*/}*.css',
                        'dist/images/{,*/}*.*',
                        'dist/styles/fonts/{,*/}*.*',
                        'dist/*.{ico,png}'
                    ]
                }
            }
        },

        usemin:{
            options:{
                assetsDirs:['dist','dist/images']
            },
            html:['dist/{,*/}*.html'],
            css:['dist/styles/{,*/}*.css']
        },

        htmlmin:{
            dist:{
                options:{
                    collapseBooleanAttributes:true,
                    collapseWhitespace:true,
                    removeAttributeQuotes:true,
                    removeCommentsFromCDATA:true,
                    removeEmptyAttributes:true,
                    removeOptionalTags:true,
                    removeRedundantAttributes:true,
                    useShortDoctype:true
                },
                files:[{
                    expand:true,
                    cwd:'dist',
                    src:'{,*/}*.html',
                    dest:'dist'
                }]
            }
        }
    });
};

