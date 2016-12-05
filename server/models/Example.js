var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ExampleSchema = new Schema({
	first_name: {
		type: String,
		required: false,
		index: true,
		default: ''
	},
	middle_names: {
		type: String,
		default: ''
	},
	last_name: {
		type: String,
		required: true,
		trim: true,
		index: true
	},
	organization: {
		type: ObjectId,
		required: false,
		index: true
	},
	removed: {
		type: Boolean,
		required: false,
		default: false
	},
	phones: [ { type: ObjectId, ref: 'Phone'} ],
	emails: [ { type: ObjectId, ref: 'Email'} ],
	links: [ { type: ObjectId, ref: 'Link'} ],
	locations: [ { type: ObjectId, ref: 'Location'} ],
	cards: [ { type: ObjectId } ],
	donations: [ { type: ObjectId } ],
	events: [ { type: ObjectId } ]
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

ExampleSchema.statics.findAll = function(cb){
	return this.find({})
		.populate({
			path: 'phones',
			options: {
				sort: {
					primary: -1,
					_id: 1
				}
			}
		})
		.populate({
			path: 'emails',
			options: {
				sort: {
					primary: -1,
					_id: 1
				}
			}
		})
		.populate({
			path: 'links',
			options: {
				sort: {
					primary: -1,
					_id: 1
				}
			}
		})
		.populate({
			path: 'locations',
			options: {
				sort: {
					primary: -1,
					_id: 1
				}
			}
		})
		.exec(cb);
}

ExampleSchema.statics.findById = function(cid, cb){
	return this.findOne({
		_id: cid
	}).populate({
			path: 'phones',
			options: {
				sort: {
					primary: -1,
					_id: 1
				}
			}
		})
		.populate({
			path: 'emails',
			options: {
				sort: {
					primary: -1,
					_id: 1
				}
			}
		})
		.populate({
			path: 'links',
			options: {
				sort: {
					primary: -1,
					_id: 1
				}
			}
		})
		.populate({
			path: 'locations',
			options: {
				sort: {
					primary: -1,
					_id: 1
				}
			}
		})
		.exec(cb);
}

ExampleSchema.statics.findByExamplename = function(nameQuery, cb){
	return this.find({ 
		$or: [
			{
				'first_name': new RegExp(nameQuery, 'gi')
			},
			{
				'middle_names': new RegExp(nameQuery, 'gi')
			},
			{
				'last_name': new RegExp(nameQuery, 'gi')
			}
		]
	}, cb);
};

ExampleSchema.statics.findLatestUpdate = function(cb){
	return this.findOne({}, {}, {
		sort: {
			updated_at: -1
		}
	}, cb);
};

var Example = mongoose.model('Example', ExampleSchema);

module.exports = Example;