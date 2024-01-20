import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupsIcon from '@mui/icons-material/Groups'
import { CardMedia } from '@mui/material'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
function Card({ temporaryHiddenMedia
}) {
  if (temporaryHiddenMedia) return (
    <MuiCard sx={{ maxWidth: 345,
      cursor:'pointer',
      gap:1,
      boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow:'unset'
    }}>
      <CardContent sx={{
        p:1.5, '&:last-child':{
          p:1.5
        }
      }}>
        <Typography> SownDev  </Typography>
      </CardContent>
      <CardActions sx={{ p:'0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupsIcon/>}>10</Button>
        <Button size="small" startIcon={<CommentIcon/>}>20</Button>
        <Button size="small" startIcon={<AttachmentIcon/>}>4</Button>

      </CardActions>
    </MuiCard>
  )
  return (
    <MuiCard sx={{ maxWidth: 345,
      cursor:'pointer',
      gap:1,
      boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow:'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://th.bing.com/th/id/OIP.G6wrRmvN4QcIAku4yL24XQHaD5?rs=1&pid=ImgDetMain"
        title="green iguana"
      />
      <CardContent sx={{
        p:1.5, '&:last-child':{
          p:1.5
        }
      }}>
        <Typography> SownDev  </Typography>
      </CardContent>
      <CardActions sx={{ p:'0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupsIcon/>}>10</Button>
        <Button size="small" startIcon={<CommentIcon/>}>20</Button>
        <Button size="small" startIcon={<AttachmentIcon/>}>4</Button>

      </CardActions>
    </MuiCard>
  )
}

export default Card