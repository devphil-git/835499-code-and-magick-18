var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TITLE_GAP = 35;
var COLUMN_GAP = 50;
var TEXT_HEIGHT = 20;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 130;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMax = function (arr) {
  var max = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

var getColor = function (value) {
  return 'hsl(' + value + ', ' + Math.round(Math.random() * 100) + '%, 50%)';
};

var getFillColor = function (name) {
  return name === 'Вы' ? 'rgba(255, 0, 0, 1)' : getColor(250);
};

window.renderStatistics = function (ctx, players, time) {
  var maxTime = getMax(time);

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  for (var i = 0; i < players.length; i++) {
    var barHeight = COLUMN_HEIGHT * time[i] / maxTime;

    ctx.fillStyle = '#000';
    ctx.font = '16 px, PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + TITLE_GAP, CLOUD_Y + TITLE_GAP);
    ctx.fillText('Список результатов:', CLOUD_X + TITLE_GAP, CLOUD_Y + TITLE_GAP + TEXT_HEIGHT);
    ctx.fillText(Math.round(time[i]), CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT - GAP - TEXT_HEIGHT - barHeight - GAP, COLUMN_WIDTH);
    ctx.fillText(players[i], CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT - GAP);


    ctx.fillStyle = getFillColor(players[i]);

    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT - GAP - TEXT_HEIGHT, COLUMN_WIDTH, -barHeight);
  }
};
