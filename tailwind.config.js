

module.exports = {
    theme: {
      container: {
        center: true
      },
      fontFamily: {
        'aeries': ['Aeries Sans'],
        'nunito' : ['Nunito Sans'],
      },
      fontWeight: {
        'thin': 200,
        'light' : 300,
        'medium' : 400,
        'semi-bold' : 600,
        'bold' : 700,
        'extra-bold': 800
      },
      fontSize: {
        'xx-large' : '3.06rem',
        'display': '2.43rem',
        'header' : '1.93rem',
        'title' : '1.56rem',
        'subhead' : '1.15rem',
        'body' : '1rem',
        'minimum-text': '.81rem',
        'fine-print' : '.625rem'
      },
      colors: {
        transparent: 'transparent',
        blue: {
          default:      '#345BA9',
          '800':        '#193878',
          '700':        '#1649A0',
          '600':        '#345BA9',
          '500':        '#396DB5',
          '400':        '#467FC1',
          '300':        '#57A5DA',
          '200':        '#B6E3FA',
          '100':        '#D4EAF8',
        },
        red: {
          default:      '#BE212F',
          '800':        '#8E0F1B',
          '700':        '#BE212F',
          '600':        '#D43027',
          '500':        '#E64C33',
          '400':        '#EE6A51',
          '300':        '#EB806B',
          '200':        '#F0AFA3',
          '100':        '#F3DCD6'
        },
        green: {
          default:      '#34B67F',
          '800':        '#0F5636',
          '700':        '#0F6745',
          '600':        '#068A5B',
          '500':        '#34B67F',
          '400':        '#73C7A0',
          '300':        '#9FD3B9',
          '200':        '#C2E1CE',
          '100':        '#E7F4EB'
        },
        orange: {
          default:      '#FAA31A',
          '800':        '#C55B18',
          '700':        '#F36B21',
          '600':        '#F6891E',
          '500':        '#FAA31A',
          '400':        '#FFD503',
          '300':        '#FCF58B',
          '200':        '#F7F2C0',
          '100':        '#F9F6EB'
        },
        purple: {
          default:      '#6359A7',
          '800':        '#362C83',
          '700':        '#3F3894',
          '600':        '#54489E',
          '500':        '#6359A7',
          '400':        '#8076B6',
          '300':        '#9A8CC3',
          '200':        '#C0B5D9',
          '100':        '#EBE6F2'
        },
        neutral: {
          '2000':       '#060E1E',
          '1900':       '#0C1E41',
          '1800':       '#162B4D',
          '1700':       '#203858',
          '1600':       '#344563',
          '1500':       '#41526E',
          '1400':       '#505F79',
          '1300':       '#5E6D85',
          '1200':       '#6C788D',
          '1100':       '#7A879B',
          '1000':       '#8993A4',
          '900':        '#96A0AF',
          '800':        '#A5ADBA',
          '700':        '#B2BAC5',
          '600':        '#C0C6D0',
          '500':        '#DFE3E9',
          '400':        '#ECEEF2',
          '300':        '#F6F8FA',
          '200':        '#FCFDFE',
          '100':        '#ffffff'
        },
        white: '#ffffff',
        black: '#060E1E'
      },
      maxWidth: {
        'page-inset': '56rem'
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1200px',
      },
      extend: {
        spacing: {
          '72': '18rem',
          '80': '20rem',
          '82': '24rem',
          '120': '30rem',
          '160': '40rem',
          '240': '60rem',
          '320': '80rem'
        }
      }
    },
    variants: {
      backgroundColor: ['hover', 'focus', 'last', 'first'],
      margin: ['last', 'first', 'responsive'],
      padding: ['last', 'first', 'responsive']
    },
    corePlugins: {
      translate: false,
    },
    plugins: []
  }
  