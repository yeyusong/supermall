import axios from 'axios'


export function getCategory() {
  return axios({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return axios({
    url: '/category',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return axios({
    url: '/category/detail',
    params: {
      miniWallkey,
      type
    }
  })
}