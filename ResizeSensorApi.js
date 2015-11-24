/**
 * @see https://github.com/pesla/ResizeSensor
 * @author Peter Slagter
 * @copyright MIT
 * @preserve
 */

define('droplet/ResizeSensor/ResizeSensorApi', ['droplet/ResizeSensor/ResizeSensor'],
	/**
	 * @param ResizeSensor
	 * @returns {ResizeSensorApi}
	 */
	function (ResizeSensor) {
		'use strict';

		/** {{}} Map of all resize sensors (id => ResizeSensor) */
		var allResizeSensors = {};

		/**
		 * @constructor
		 */
		var ResizeSensorApi = function () {};

		/**
		 * @param {HTMLElement} targetElement
		 * @param {Function} callback
		 * @returns {ResizeSensor}
		 */
		ResizeSensorApi.prototype.create = function (targetElement, callback) {
			var sensorId = this.getSensorId(targetElement);

			if (allResizeSensors[sensorId]) {
				return allResizeSensors[sensorId];
			}

			var Instance = new ResizeSensor(targetElement, callback);
			allResizeSensors[sensorId] = Instance;
			return Instance;
		};

		/**
		 * @param {HTMLElement} targetElement
		 */
		ResizeSensorApi.prototype.destroy = function (targetElement) {
			var sensorId = this.getSensorId(targetElement);

			/** @var ResizeSensor */
			var Sensor = allResizeSensors[sensorId];

			if (!Sensor) {
				console && console.error("Can't destroy ResizeSensor (404 not found).", targetElement);
			}

			Sensor.destroy();
			delete allResizeSensors[sensorId];
		};

		ResizeSensorApi.prototype.resetTargetElement = function (targetElement) {
			var sensorId = this.getSensorId(targetElement);

			/** @var ResizeSensor */
			var Sensor = allResizeSensors[sensorId];

			if (!Sensor) {
				console && console.error("Can't reset target element (ResizeSensor not found).", targetElement);
			}

			Sensor.resetTargetElement(targetElement);
		};

		/**
		 * @param {HTMLElement} targetElement
		 * @returns {string}
		 */
		ResizeSensorApi.prototype.getSensorId = function (targetElement) {
			return targetElement.id;
		};

		return new ResizeSensorApi();
	}
);