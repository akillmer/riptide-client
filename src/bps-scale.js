import humanFormat from 'human-format'

const bpsScale = new humanFormat.Scale({
  'B/s': 1,
  'KB/s': 1024,
  'MB/s': 1024 * 1024,
  'GB/s': 1024 * 1024 * 1024,
  'TB/s': 1024 * 1024 * 1024 * 1024
})

export default bpsScale
