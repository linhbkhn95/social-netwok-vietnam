import React from 'react'
import RestfulUtils from 'app/utils/RestfulUtils'
import Gallery from 'react-grid-gallery';
var _ = require('lodash');
var ReactPhotoGrid = require('react-photo-grid');

function handleImageClick(image) {
  console.log('Image clicked. Show it in a nice lightbox?');
}

var feelingLucky = Math.floor(Math.random()*2);
var luckType = ['', 'nightlife', 'animals', 'city', 'people', 'nature', 'sports', 'cats', 'transport'];
var imageData = [
  '/images/upload/378968d6-5236-4064-b613-8af21a5b1133.jpg',

];

// if(feelingLucky || true) {
//   var luckTypeSelector = luckType[Math.floor(Math.random()*luckType.length)];
//   imageData = [
//       {path: 'http://lorempixel.com/600/500/'+luckTypeSelector },
//       {path: 'http://lorempixel.com/400/400/'+luckTypeSelector },
//       {path: 'http://lorempixel.com/500/700/'+luckTypeSelector },
//       {path: 'http://lorempixel.com/600/800/'+luckTypeSelector }
//   ];
// } else { // for testing
//   imageData = [
//       {path: 'http://placehold.it/400x400'},
//       {path: 'http://placehold.it/500x700'},
//       {path: 'http://placehold.it/600x500'},
//       {path: 'http://placehold.it/600x800'}
//   ];
// }


// import PropTypes from 'prop-types';

// const IMAGES =
// [{
//   src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
//   thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
//   thumbnailWidth: 320,
//   thumbnailHeight: 174,
//   isSelected: true,
//   caption: "After Rain (Jeshu John - designerspics.com)"
// },
// {
//   src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
//   thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
//   thumbnailWidth: 320,
//   thumbnailHeight: 212,
//   tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
//   caption: "Boats (Jeshu John - designerspics.com)"
// },

// {
//   src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
//   thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
//   thumbnailWidth: 320,
//   thumbnailHeight: 212
// }]
// class ContainerFile extends React.Component{
//   componentDidMount(){
//     let post_id = '53'
//     RestfulUtils.post('/fileupload/getFilePostId',{post_id}).then((res)=>{
//        if(res.EC==0){

//        }
//     })
//   }
//   constructor(props){
//     super(props);

//     this.state = {
//         images: this.props.images,
//         currentImage: 0
//     };

//     this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
//     this.deleteImage = this.deleteImage.bind(this);
// }

// onCurrentImageChange(index) {
//     this.setState({ currentImage: index });
// }

// deleteImage() {
//     if (window.confirm(`Are you sure you want to delete image number ${this.state.currentImage}?`)) {
//         var images = this.state.images.slice();
//         images.splice(this.state.currentImage, 1)
//         this.setState({
//             images: images
//         });
//     }
// }

// render () {
//     return (
//         <div style={{
//             display: "block",
//             minHeight: "1px",
//             width: "100%",
//             border: "1px solid #ddd",
//             overflow: "auto"}}>
//             <div style={{
//                  padding: "2px",
//                  color: "#666"
//                 }}>Xem thêm: {this.state.currentImage}</div>
//             <Gallery
//                 images={this.state.images}
//                 enableLightbox={true}
//                 enableImageSelection={false}
//                 currentImageWillChange={this.onCurrentImageChange}

//                 customControls={[
//                     <button className="btn" key="deleteImage" onClick={this.deleteImage}>Xóa ảnh n</button>
//                 ]}
//             />
//         </div>
//     );
// }
// }

// ContainerFile.propTypes = {
// images: PropTypes.arrayOf(
//     PropTypes.shape({
//         src: PropTypes.string.isRequired,
//         thumbnail: PropTypes.string.isRequired,
//         srcset: PropTypes.array,
//         caption: PropTypes.string,
//         thumbnailWidth: PropTypes.number.isRequired,
//         thumbnailHeight: PropTypes.number.isRequired
//     })
// ).isRequired
// };

// ContainerFile.defaultProps = {
// images: [
//     {
//         src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
//         thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
//         thumbnailWidth: 640,
//         thumbnailHeight: 700,
//         caption: "After Rain (Jeshu John - designerspics.com)"
//     },
//     // {
//     //     src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
//     //     thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
//     //     thumbnailWidth: 320,
//     //     thumbnailHeight: 183,
//     //     caption: "37H (gratispgraphy.com)"
//     // },
//     // {
//     //     src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
//     //     thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
//     //     thumbnailWidth: 271,
//     //     thumbnailHeight: 320,
//     //     caption: "Orange Macro (Tom Eversley - isorepublic.com)"
//     // },
//     // {
//     //     src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
//     //     thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
//     //     thumbnailWidth: 320,
//     //     thumbnailHeight: 213,
//     //     caption: "201H (gratisography.com)"
//     // },
//     // {
//     //     src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
//     //     thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
//     //     thumbnailWidth: 320,
//     //     thumbnailHeight: 213,
//     //     caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
//     // },

// ]
// };

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
});

import ComponentVideo from './ComponentVideo'

class  AdvancedGridList extends React.Component {
  constructor(props){
    super(props)
    this.state ={
        listFile :[]
    }
  }
  componentDidMount(){
    let post_id = this.props.post_id
     this.getListFile(post_id)

  }
  getListFile(post_id){
    let self = this

    RestfulUtils.post('/fileupload/getFilePostId',{post_id}).then((res)=>{
      if(res.EC==0&&res.DT.length>0){
           self.setState({listFile:self.convertData(res.DT)})
      }
   })
  }

  componentWillReceiveProps(nextProps){
     let {post_id} = nextProps
     if(post_id!=this.props.post_id)
        this.getListFile(post_id)
  }
  convertData(data){
    if(data.length==1){
      data[0].cols=data[0].rows = 2
    }
    else if(data.length==2){
      data[0].cols = data[1].cols=2
      data[0].rows= data[1].rows =1
    }
    else if(data.length==3){
      data[0].cols =2
      data[0].rows =1
      data[1].rows= data[2].rows = data[1].cols = data[2].cols = 1
    }
    else
      data[0].cols =data[0].rows  =data[3].cols =data[3].rows  = data[1].rows= data[2].rows = data[1].cols = data[2].cols = 1


    return data

  }
  render(){
    let { classes } = this.props;
    let length = this.state.listFile.length;
    if(this.state.listFile.length>0)
    return (
    <div className={classes.root}>
      <GridList cellHeight={'250'} spacing={1} className={classes.gridList}>
        {this.state.listFile.map((tile,index) => (
          <GridListTile key={tile.img} cols={tile.cols} rows={tile.rows}>

           {tile.type_file=="image"?<img src={tile.url_file} alt={tile.title} />:<ComponentVideo src={tile.url_file} />}
            <GridListTileBar
              title={tile.title}
              titlePosition="top"
              actionIcon={
                <IconButton className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>

  );
  else
    return null
 }
}

AdvancedGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvancedGridList);
