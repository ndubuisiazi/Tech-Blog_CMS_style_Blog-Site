const { Gallery } = require('../models');

const gallerydata = [
  {
    author: 'Printemps',
    blog_text: 'tes2',
    blog_title: 'test',
  }
  ,
  {
    author: 'Printemps3',
    blog_text: 'tes32',
    blog_title: 'test3',
  },{
    author: 'Printemps',
    blog_text: 'tes23333',
    blog_title: 'test',
  },{
    author: 'Printemps3',
    blog_text: 'tes3sdfs2',
    blog_title: 'tessdffdst3',
  }
];

const seedGallery = () => Gallery.bulkCreate(gallerydata);

module.exports = seedGallery;
