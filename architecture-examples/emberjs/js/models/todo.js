/*global Todos Ember */
'use strict';

Todos.Todo = Ember.Model.extend({
	id: Ember.attr(),
	title: Ember.attr(),
	isCompleted: Ember.attr('boolean'),

	todoDidChange: function () {
		Ember.run.once(this, function () {
			this.save();
		});
	}.observes('isCompleted', 'title')
});

Todos.Todo.reopenClass({
	adapter: Ember.LocalStorageAdapter.create(),
	filtered: function(property, condition){
		return Ember.FilteredRecordArray.create({
			modelClass: this,
			filterProperties: [property],
			filterFunction: function(model){
				return model.get(property) == condition;
			}
		})
	}
}); 
