import { reactive } from 'vue'

export const toast = reactive({ show: false, message: '', type: 'info', duration: 3000 })

export const showToast = (message, type = 'info', duration = 3000) => {
  toast.message = message
  toast.type = type
  toast.duration = duration
  toast.show = true
  setTimeout(() => (toast.show = false), duration + 300)
}
