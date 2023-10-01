import '@fontsource/roboto/300.css'; // Importing specific weight
import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight
import { Card, CardActionArea, CardMedia, CardContent, Typography, Pagination, Grid, Link, Box, Divider } from '@mui/material';
import './AboutPage.css'
export default function About() {
    return (
        <div>
            <Typography variant="subtitle1" gutterBottom component="div" style={{ fontFamily: 'Roboto', fontWeight: 500 }} textAlign='center'>Description: </Typography>
            <Divider variant='middle'/>
            <Typography variant='body2'component="div" style={{ fontFamily: 'Roboto', fontWeight: 200 }}>This app was designed for people interested in exploring the National Park, and to introduce to you the wildlife, flora, and fauna that you will probably encunter. You can zoom in with the plus and minus icons in the upper left of the map, and view the scale in the lower left. Click on a layer in the map to view its properties. After closing the modal you can then see if there is any relevant plant data for the selected color on the left side of the map. The plant data will show the description of the habitable zones in the US, Family, Scientific Name, etc. Please note not all plant data has all the info filled. Click on the tabs beneath Alerts, Events, Things To Do, etc to see more detailed information about closings, upcoming events, and pricing info</Typography>
           
            <Typography variant='subtitle1' component="div" style={{fontFamily: 'Roboto', fontWeight: 500,}} textAlign='center'>Trip Planning: </Typography>
            <Divider variant='middle'/>
            <Typography variant='body2'component="div" style={{ fontFamily: 'Roboto', fontWeight: 200 }}> If you plan on camping on site it is a good idea to book your campground in advance. If you are looking to camp nearby or want to look for cheaper options, this website <a href='https://freecampsites.net/'>freecampsites.net</a> is a great tool. For those who are planning a road trip along side the park (which I personally recommend everyone who enjoys the outdoors do at some point in their life), the <a href='https://www.gasbuddy.com/tripcostcalculator'>Gas calculator is another great source of material</a>. Generally, you should pack for quick drying, non-cotton(for in case you get wet. Even though it doesn't rain here much but it's always good practice)  and some wool clothes, hiking boots that are broken in (there will be a lot of hiking, so make sure the boots have a little wear on them). Most importantly, bring boots that are water-durable/proof. Take note of the ranger stations in case of an emergency. Have a map sunscreen available at all times. For more detailed info on what to pack , check out <a href='https://www.rei.com/blog/travel/zion-national-park-backpacking-gear-list'>REI's</a> list of what to pack. Check out the NPS website <span><a href='https://www.nps.gov/zion/planyourvisit/fees.htm'>here</a></span> for more info on pricing</Typography>
            
            <Typography variant='subtitle1' component="div" style={{fontFamily: 'Roboto', fontWeight: 500,}} textAlign='center'>When should I go?: </Typography>
            <Divider variant='middle'/>
            <Typography variant='body2'component="div" style={{ fontFamily: 'Roboto', fontWeight: 200 }}>The reality is even though the visit will be worth it, this park is VERY crowded during peak hiking season. Many national holidays and during summer time are packed with people, and according to the NPS, the peak months are <a href='https://www.nps.gov/zion/planyourvisit/crowds.htm'>March through November</a> <strong>April, September, and October are less busy than summer months but still busy for the main Zion Canyon.</strong> For those who want peace and quiet, the winter months are your best bet, but keep in mind while the winters are relatively mild, you should pack for staying dry and warm and plant ahead if weather gets nasty. This will require careful dirving--especially through the Rockies.</Typography>
            <Typography variant='subtitle1' component="div" style={{fontFamily: 'Roboto', fontWeight: 500,}} textAlign='center'>Sources: </Typography>
            <Divider variant='middle'/>
            <Typography variant='body2'component="div" style={{ fontFamily: 'Roboto', fontWeight: 200 }}>For all brid-related info- <a href='https://www.allaboutbirds.org/news/?__hstc=161696355.94f986ca1fdfe4245a796c31346778bb.1696171049338.1696171049338.1696171049338.1&__hssc=161696355.2.1696171049338&__hsfp=948887092&_gl=1%2Aujhvi0%2A_ga%2AODI3MjIyMTE3LjE2OTYxNzEwNDk.%2A_ga_QR4NVXZ8BM%2AMTY5NjE3MTA0OC4xLjEuMTY5NjE3MTExMS42MC4wLjA.&_ga=2.208123153.2090390511.1696171049-827222117.1696171049'>Cornell Lab of Ornithology</a> and <a href='https://xeno-canto.org/'>xeno-canto.org</a> for bird calls
            <br /> 
            Big thank you to NPS.gov for providing the open source on vegetation data (see <a href='https://www.nps.gov/im/vmi-zion.htm'>here</a>), the API for the park information, and being a great place to find info on anything outdoor park related <a href='https://www.nps.gov/index.htm'>NPS.gov</a>

            </Typography>
        </div>
    )
}