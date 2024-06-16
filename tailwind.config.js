export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['Dancing Script', 'cursive'],
        roboto: ['Roboto', 'cursive'],
      
      },
      colors: {
        main:'#587050',
        secmain:'#587060',
        thmain:'#587040',
        text_main:'#F7E1BC',
        category_back:'#54372B',
        item_back:'#F7E1BC',
      },
    },
  },
  plugins: [],
}
