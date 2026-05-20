//TODO
//Declare consts/global variables
        const margin = 30;
        const width = 500; 
        const height = 500;

   
    //Load data and related variables
        d3.csv("CurrentPopulationSurvey.csv").then(data => {
            console.log("data", data)
        //format data
       data.forEach(d => {
            d.year = +d.year;
            d.hrwage = +d.hrwage;
           
        });
    //Grouping the data by gender
    const ByGender = d3.group(data,d => d.sex);

    //Scales - note: band and linear
        const xScale = d3.scaleLinear()
                        .domain(d3.extent(data, d => d.year))
                        .range([margin, width - margin])
                
        
        const yScale = d3.scaleLinear()
                        .domain([0, d3.max(data, d => d.hrwage)]) 
                        .range([height - margin, margin]);
    //Adding svg
         const svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    //Axes - create axes
        const bottomAxis = d3.axisBottom()
                                .scale(xScale);
        const leftAxis = d3.axisLeft()
                                .scale(yScale); 
    //Lines
    const line = d3.line()
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.hrwage));
    //Adding 2 different gender lines
    ByGender.forEach((values, key) => {
        
        svg.append("path")
           .datum(values.sort((a, b) => a.year - b.year))
            .attr("fill", "none")
            .attr("stroke", key === "Men" ? "blue" : "pink")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    });
    //Axes - call axes
        svg.append("g")
            .attr("transform", "translate(0," + (height - margin) + ")")
            .call(bottomAxis);

        svg.append("g")
            .attr("transform", "translate(" + margin + ",0)")
            .call(leftAxis);

    });