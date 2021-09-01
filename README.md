## Create React App Visualization

This assessment was bespoke handcrafted for dennisarnold.

Read more about this assessment [here](https://react.eogresources.com)

## Run the Application
Clone repository
yarn install
yarn build
serve -s build
open http://localhost:5000 

## Future Developments
-Initial Query for past 30 minutes of data. It currently only displays data that has been recieved while the app is running
-Proper scaling of Y-axis for multiple ranges of values
-Multiple Y-axis displaying different degrees of magnitude. (I did have multiple Y-Axis showing at one point, but without the graph scaling properly, I was quite unhappy with the way they looked)
-More clarity on tooltip for units of measure on each line graph
-More clarity on buttons for which metrics are selected
-Time/space complexity optimizations
-Add alerts for data values that fall outside 'Normal range' for each metric

## My Experience With This Project
This was a fun assessment! It was quite challenging to begin with as it was my first real project using typescript, redux, and GraphQL but I loved the opportunity to get more familiar with these tools. There were definitely some choices I made towards less elegant solutions due to my unfamiliarity, and opted for a solution I knew how to implement without further research. I definitely look forward to becoming more familiar with Typescript, Redux, and GraphQL and revisiting this project. 