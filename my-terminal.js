const root = '~';
let cwd = root;
// directories 


const directories = {
    work_experience:[
        '',
        '<white>Dhani Stock</white>',
        '<green>Java Developer</green>',
        '1.Leveraged Google Cloud service to help migrate existing projects to the cloud, reducing deployment time by 30% and increasing security as per market standards.',
'2.Initiated a service using a time-series database to reduce customer-specific issues by 55%.',
'3.Strengthened different levels of a distributed system architecture to achieve new functionality and increase stabilization by 25%',
        '',
        '<green>Junior Java Developer</green>',
        '1.Developed BSE futures and options buy/sell functionality to increase business growth by 10%.',
'2.Built functionalities that increased user interaction by 40% using Java Swing.',
'3.Collaborated closely with cross-functional teams to successfully transition and hand over multiple services, facilitating smooth operations and integration while enhancing code efficiency by 10%.',
'4.Reduced Latency of existing DB writing process by 30%.',
'5.Reduced server boot time by 20% for high throughput.',
'6.Optimized application performance by 40% through efficient Java code and algorithm implementation.',
'7.Constructed and structured functionalities resulting in a 20% overall improvement in business work and backend performance.'

    ],education: [
        '',
        '<white>education</white>',
        '* <a href="https://www.iimtindia.net/">IIMT College Of Engineering (Gr. Noida)</a> <grey>Bachelors of Technology</grey> \n <yellow>"Computer Science and Engineering"</yellow> 2019-2023',
        ''
    ],
    projects: [
        '',
        '<white>Projects</white>',
        [
            ['Dhani Stock App:',
                '',
                'A mobile application used for handy trading in stock market'
               ],
            ['Power IndiaBulls (PIB):',
             '',
             'A Desktop application used for trading in the stock market available for both windows and macOs.'
            ],
            ['Middle Office Service:','',
             'An Internal service of<yellow> Dhani</yellow> used for the end of day process held on stock broker end.',
            ],
            ['Partner Portal:',
             '',
             'An Internal service of<yellow> Dhani</yellow> used by the client management team.'
            ],
        ].map(([name, url, description = '']) => {
            return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
        }),
        ''
    ].flat(),
    skills: [
        '',
        '<white>languages</white>',

        [
            'Java',
            'Javscript',
            'Bash'
        ].map(lang => `* <yellow>${lang}</yellow>`),
        '',
        '<white>Backend Technologies</white>',
        [
            'Spring',
            'Spring Boot',
            'Mockito',
        ].map(lib => `* <green>${lib}</green>`),
        '',
        '<white>tools</white>',
        [
            'Docker',
            'git',
            'JPA',
            'PostMan',
            'Linux'
        ].map(tools => `* <blue>${tools}</blue>`),
        '',
        '<white>Architectures</white>',
        [
            'Distributed Systems',
            'SOA',
            'Microservices',
            'Monolithic',
        ].map(arch => `* <blue>${arch}</blue>`),
        '',
        '<white>Databases</white>',
        [
            'MySQL',
            'MongoDB',
            'OracleDB',
            'Postgresql',
            'Influx DB',
        ].map(arch => `* <blue>${arch}</blue>`),
        ''
    ].flat(),
    achievements:[
        '',
        '<white><a href="">Achievements</a></white>',
        '1. Certified in  Competitive coding from RCPL<brown>(by IIT Kanpur)</brown>.',
        '2. Hackerrank Problem Solving certificate.',
        '3. Java 11 Course on Linkedin',
        
    ]
};
const dirs = Object.keys(directories);
function print_dirs() {
    term.echo(dirs.map(dir => {
        return `<blue class="directory">${dir}</blue>`;
    }).join('\n'));
}

const commands = {
    help() {
        term.echo(`List of available commands: ${help}`);
    },
    echo(...args) {
        if (args.length > 0) {
            term.echo(args.join(' '));
        }
    }
    ,cd(dir = null) {
        if (dir === null || (dir === '..' && cwd !== root)) {
            cwd = root;
        } else if (dir.startsWith('~/') && dirs.includes(dir.substring(2))) {
            cwd = dir;
        } else if (dirs.includes(dir)) {
            cwd = root + '/' + dir;
        } else {
            this.error('Wrong directory');
        }
    }, ls(dir = null) {
        if (dir) {
            if (dir.match(/^~\/?$/)) {
                // ls ~ or ls ~/
                print_dirs();
            } else if (dir.startsWith('~/')) {
                const path = dir.substring(2);
                const dirs = path.split('/');
                if (dirs.length > 1) {
                    this.error('Invalid directory');
                } else {
                    const dir = dirs[0];
                    this.echo(directories[dir].join('\n'));
                }
            } else if (cwd === root) {
                if (dir in directories) {
                    this.echo(directories[dir].join('\n'));
                } else {
                    this.error('Invalid directory');
                }
            } else if (dir === '..') {
                print_dirs();
            } else {
                this.error('Invalid directory');
            }
        } else if (cwd === root) {
            print_dirs();
        } else {
            const dir = cwd.substring(2);
            this.echo(directories[dir].join('\n'));
        }
    }

};

//Prompt
const user = 'usr';
const server = 'udit-portfolio';

function prompt() {
    return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}

//terminal colours for tags
$.terminal.xml_formatter.tags.green = (attrs) => {
    return `[[;#44D544;]`;
};
$.terminal.xml_formatter.tags.blue = (attrs) => {
    return `[[;#55F;;${attrs.class}]`;
};

const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  });
  

  const command_list = Object.keys(commands);
const formatted_list = command_list.map(cmd => {
    return `<white class="command">${cmd}</white>`;
});
const help = formatter.format(formatted_list);

const font = 'Slant';
figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);


function render(text) {
    const cols = term.cols();
    return trim(figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    }));
}
function rainbow(string) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string).join('\n');
}

function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
}
function trim(str) {
    return str.replace(/[\n\s]+$/, '');
}
const term = $('body').terminal(commands, {
    greetings: false, // to hide terminal greeting of  library
    checkArity: false,
    exit: false,
    completion(string) {
        // in every function we can use this to reference term object
        const { name, rest } = $.terminal.parse_command(this.get_command());
        if (['cd', 'ls'].includes(name)) {
            if (rest.startsWith('~/')) {
                return dirs.map(dir => `~/${dir}`);
            }
            if (cwd === root) {
                return dirs;
            }
        }
        return Object.keys(commands);
    },
    execHash: true,
    prompt
});

term.pause();
// initial banner 
function ready() {
    term.echo(() => {
      const ascii =rainbow(render('UDIT BAHUKHANDI'));
      return `${ascii}\nWelcome to my Terminal Portfolio\n`;
    }).resume();
   
 }
 // event on click of command 
 term.on('click', '.command', function() {
    const command = $(this).text();
    term.exec(command);
 });
 term.on('click', '.directory', function() {
    const dir = $(this).text();
    term.exec(`cd ~/${dir}`);
});
 // first time execution of help so that all people know what are the commands  available
 term.exec('help',true);

// FOR - Coloring and checking for values at start of the portfolio

 const re = new RegExp(`^\s*(${command_list.join('|')}) (.*)`);

$.terminal.new_formatter(function(string) {
    return string.replace(re, function(_, command, args) {
        return `<white>${command}</white> <aqua>${args}</aqua>`;
    });
});



