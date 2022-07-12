import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);
const MY_ICONS = {
  item: "mdi-barcode-scan",
};

const options = {
  // breakpoint: { scrollbarWidth: 12 },
  theme: {
    themes: {
      light: {
        primary: "#00447a", //colors.indigo.darken2,
        secondary: "#f36f21", //colors.orange,
        //accent: colors.indigo.base,
      },
    },
  },
};

export default new Vuetify({
    ...options
})

// export default new Vuetify({
//     icons: {
//         iconfont: 'mdi',  // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
//         values: MY_ICONS,
//       },
//       theme: {
//         dark: false,
//       },
//       themes: {
//         light: {
//           primary: '#0032a5',
//           secondary: '#ff4d00',
//           accent: '#8c9eff',
//           error: '#b71c1c',
//           blue: '#2D88D4',
//         },
//       }
// })
