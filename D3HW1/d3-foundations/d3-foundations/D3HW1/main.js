//TODO
//Creating varaibles 
//Declare consts/global variables
        const margin = 50;
        const width = 500; 
        const height = 500;
//Loading in data file and creating variables
d3.csv("missingcounts.csv").then(data => {
    console.log(data);

    //format data
    data.forEach(d => {
        d.Variable = d.Variable;
        d["MissingCount"] = +d["Missing Count"];
    });
    const maxY = d3.max(data, d => d.MissingCount);

//Scales
    const xScale = d3.scaleBand()
                    .domain(data.map(d => d.Variable))
                    .range([margin, width - margin])
                    .paddingInner(.02);

    const yScale = d3.scaleLinear()
                    .domain([0, maxY])
                    .range([height - margin, margin]);
//SVG
    const svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
//Axes
    const bottomAxis = d3.axisBottom()
                         .scale(xScale);
    const leftAxis = d3.axisLeft()
                       .scale(yScale);  
//Bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.Variable))
        .attr("y", d => yScale(d.MissingCount))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - margin - yScale(d.MissingCount))
        .attr("fill", "pink");
//Call Axes
     svg.append("g")
            .attr("transform", "translate(0," + (height - margin) + ")") 
            .call(bottomAxis);

        svg.append("g")
            .attr("transform", "translate(" + margin + ",0)")
            .call(leftAxis); 

                
    });
