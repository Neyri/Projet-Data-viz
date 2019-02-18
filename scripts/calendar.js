// functions related to the use of the calendar

function get_date_max(dates) {
	// take list of dates and return the maximum date with format yyyy-mm-dd
	return date_to_str(dates[dates.length - 1]);		
}

function get_date_min(dates) {
	// take list of dates and return the minimum date with format yyyy-mm-dd
	return date_to_str(dates[0]);
}

function date_to_str(date){
	// take a data and return a string yyyy-mm-dd
	month = (date.getMonth() + 1).toString();
	if (month.length == 1) {
		month = "0" + month;
	}
	day = date.getDate().toString();
	if (day.length == 1) {
		day = "0" + day;
	}
	year = date.getFullYear().toString();
	return year + "-" + month + "-" + day;
}

function get_daily_locations(locations, date){
	// filter locations by date of the day
	locations_of_the_day = []
	for (var i = 0; i < locations.length; i++) {
		if (date_to_str(new Date(Number(locations[i]['timestampMs']))) == date)
		{
			locations_of_the_day.push(locations[i]);
		}
	}
	return locations_of_the_day;
}

function get_daily_locations_and_time(locations, date, time){
	// filter locations by date of the day and between time1 and time2
	time = time.split(",");
	time1 = parseInt(time[0])
	time2 = parseInt(time[1])
	locations_of_the_day = []
	for (var i = 0; i < locations.length; i++) {
		date_precise = new Date(Number(locations[i]['timestampMs']));
		time_normalized = (date_precise.getHours() + date_precise.getMinutes()/60)/24*100;
		console.log(date_to_str(date_precise) == date, time_normalized < time2, time_normalized > time1)
		if (date_to_str(date_precise) == date && (time_normalized < time2) && (time_normalized > time1))
		{
			console.log('here');
			locations_of_the_day.push(locations[i]);
		}
	}
	return locations_of_the_day;
}