var timeline = {
    timeline: "one",
    children: [
        {
            event: "Event 1",
            color: "#0062B8",
            startDate: "2015-06",
            endDate: "2016-01",
            title: "Brigham Young University",
            type: "B.S. in Statistics: Data Science"
        },
        {
            event: "Event 3",
            color: "#0062B8",
            startDate: "2018-05",
            endDate: "2021-04",
            title: "Brigham Young University",
            type: "B.S. in Statistics: Data Science"
        },
        {
            event: "Event 2",
            color: "#be0029",
            startDate: "2016-01",
            endDate: "2018-01",
            title: "Japan Kobe Mission",
            type: "Volunteer Service"
        },

        {
            event: "Event 4",
            color: "#B3A369",
            startDate: "2022-08",
            endDate: "2024-08",
            title: "Georgia Tech",
            type: "M.S. in Analytics"
        },
        {
            event: "Event 5",
            color: "#049FD9",
            startDate: "2019-05",
            endDate: "2019-08",
            title: "Cisco",
            type: "Business Analyst Intern"
        },
        {
            event: "Event 6",
            color: "#002E5D",
            startDate: "2019-09",
            endDate: "2020-09",
            title: "Brigham Young University",
            type: "Statistics SQL TA, Research Lab Support"
        },
        {
            event: "Event 7",
            color: "#B3DDF2",
            startDate: "2020-06",
            endDate: "2020-08",
            title: "Drift Net Securities",
            type: "AI Product Intern"
        },
        {
            event: "Event 8",
            color: "#0f6bff",
            startDate: "2020-08",
            endDate: "2021-06",
            title: "Skill Struck",
            type: "Sales Analyst"
        },
        {
            event: "Event 9",
            color: "#049FD9",
            startDate: "2021-06",
            endDate: "present",
            title: "Cisco",
            type: "Data Scientist"
        }
    ]
};

var initialWidth = 960;
var initialHeight = 250;

var margin = {top: 30, right: 10, bottom: 30, left: 10},
    width = initialWidth - margin.left - margin.right,
    height = initialHeight - margin.top - margin.bottom;

tip = d3
    .tip()
    .attr("id", "tooltip")
    .attr("class", "d3-tip")
    .html(function (d) {
        msg = `${d.title}<br>${d.type}<br>`;
        return msg;
    });

var svg = d3
    .select(".d3timeline")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", "0 0 960 250")
    .attr("preserveAspectRatio", "xMidYMid")
    .call(tip)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var defs = svg.append("defs");

var filter = defs
    .append("filter")
    .attr("id", "glow")
    .attr("height", initialHeight)
    .attr("width", initialWidth)
    .attr("filterUnits", "userSpaceOnUse");

var blur = filter
    .append("feGaussianBlur")
    .attr("stdDeviation", 1.5)
    .attr("result", "blur");

var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode").attr("in", "blur");
feMerge.append("feMergeNode").attr("in", "SourceGraphic");

//var tip = d3.select(".tooltip");

var parseDate = d3.timeParse("%Y-%m");
var parseYear = d3.timeParse("%Y");
var mindate = parseYear(
    d3.min(timeline.children, function (d) {
        return d.startDate.slice(0, 4); // d.startDate
    })
);

var today = new Date();
var maxdate = parseYear(today.getYear() - 100 + 2001);

var xScale = d3
    .scaleTime()
    .domain([mindate, maxdate]) //today
    .range([margin.left, width - margin.right * 2]);

svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + 0 + "," + height + ")")
    .call(
        d3
            .axisBottom(xScale)
            .ticks(d3.timeYear.every(1))
            .tickFormat(d3.timeFormat("%Y"))
    );

var magicNumber = 21;

svg.call(tip);
// Date Ranges
var line = svg
    .selectAll("connectors")
    .data(timeline.children)
    .enter()
    .append("line")
    .attr("class", "segment")
    .attr("x1", function (d) {
        return xScale(parseDate(d.startDate));
    })
    .attr("x2", function (d) {
        return xScale(parseDate(d.startDate));
    })
    .attr("y1", function (d, i) {
        return height + (i + 1) * -magicNumber;
    })
    .attr("y2", function (d, i) {
        return height + (i + 1) * -magicNumber;
    })
    .style("stroke-width", 8)
    .style("stroke", function (d, i) {
        return d.color;
    })

    .style("fill", "none")
    .style("stroke-linecap", "round")
    .style("filter", "url(#glow)")
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide)
    .on("click", function (d) {
        d3.selectAll("line").style("filter", "url(#glow)");
        d3.select(this).style("filter", "none");
    })
    .transition()
    .duration(2000)
    .attr("x2", function (d) {
        if (d.endDate === "present") {
            return xScale(today);
        } else {
            return xScale(parseDate(d.endDate));
        }
    })
;


