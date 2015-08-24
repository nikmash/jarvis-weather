import Jarvis from 'jarvis-node'
import where from 'node-where'
import ForecastIo from 'forecastio'

const jarvis = new Jarvis('jarvis.ironbay.digital')

jarvis.registerRegex('conversation.weather', 'weather in (?P<query>.+)')
jarvis.registerStringable('information.weather', '%abstract')

var forecastIo = new ForecastIo('3ea58bffc4a2a000c79bb1b0084a5483');

jarvis.forever('conversation.weather', (ev) => {

	where.is(ev.model.query, function(err, result){
		if(err){
			console.log(err);
			return;
		}
		
		forecastIo.forecast(result.attributes.lat, result.attributes.lng, function (err, weather) {
			if (err){
				console.log(err);
				return;
			}
			jarvis.emit('information.weather', {
				abstract: result.attributes.city + ': ' + weather.hourly.summary
			}, ev.context)
		})
	})

})