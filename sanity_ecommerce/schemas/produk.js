export default {
  name: 'produk',
  title: 'Produk',
  type: 'document',
  fields: [
    {
      name: 'gambar',
      title: 'Gambar',
      type: 'array',
      of: [{type: 'image'}],
      option: {hotspot: true},
    },
    {
      name: 'nama',
      title: 'Nama',
      type: 'string',
    },
    {
      name: 'tipe',
      title: 'Tipe',
      type: 'slug',
      options: {
        source: 'nama',
        maxLength: 90,
      },
    },
    {
      name: 'harga',
      title: 'Harga',
      type: 'number',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    },
  ],
}
