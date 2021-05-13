
const { createApp, ref, onMounted } = Vue

const app = createApp({
  setup() {

    const colorThief = new ColorThief();
    // let bgColor = ref('rgb(255,255,255)')
    let srcImage = ref('')
    let textButton = ref('get new image')
    let circles = ref([])
    let disabled = ref(false)

    const setDominantColor = (color) => {
      const [c1, c2, c3] = color
      document.body.style.setProperty('--bg', `rgb(${c1},${c2},${c3})`)
    }

    const getColors = (img) => {
      const color = colorThief.getColor(img);
      const palette = colorThief.getPalette(img);
      setDominantColor(color)
      circles.value = palette
    }

    const getImagePicsum = async (img) => {
      const url = 'https://picsum.photos/600/300.webp'
      const request = await fetch(url)
      const blob = await request.blob()
      const imageUrl = URL.createObjectURL(blob)
      img.src = imageUrl
    }

    const getImage = async () => {
      disabled.value = true
      textButton.value = 'loading...'
      const img = document.getElementById('image')
      await getImagePicsum(img)
      textButton.value = 'get new image'
      disabled.value = false
      if (img.complete) {
        console.log('complete')
        getColors(img)
      } else {
        console.log('load')
        img.addEventListener('load', function () {
          getColors(img)
        });
      }

    }

    onMounted(() => {
      getImage()
    })

    return {
      circles,
      // bgColor,
      srcImage,
      textButton,
      getImage,
      disabled
    }
  }
})

app.mount('#app')





