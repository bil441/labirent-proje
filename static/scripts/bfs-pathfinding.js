//SOL USTTEN BASLA
var findShortestPath = function (coordinates, grid) {
    var top = coordinates[0];
    var left = coordinates[1];

    //HER BOLGENIN LOKASYONU VE ORAYA GETIREN PATHI VAR
    var location = {
        top: top,
        left: left,
        path: [],
        status: 'Start'
    };

    //BASLANGIC NOKTASI
    var queue = [location];

    while (queue.length > 0) {  //EXPLORE EDILECEK BIR YER OLDUGU SURECE

        var currentLocation = queue.shift();    //QUEUE NUN ILK ELEMANINI AL

        // DOGUYA BAK
        var newLocation = exploreInDirection(currentLocation, 'East', grid);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // GUNEYE BAK
        var newLocation = exploreInDirection(currentLocation, 'South', grid);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // BATIYA BAK
        var newLocation = exploreInDirection(currentLocation, 'West', grid);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }

        // KUZEYE BAK
        var newLocation = exploreInDirection(currentLocation, 'North', grid);
        if (newLocation.status === 'Goal') {
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            queue.push(newLocation);
        }
    }
    // PATH YOK
    return false;

};

//  "Valid", "Invalid", "Blocked", "Goal"
var locationStatus = function (location, grid) {
    var gridSize = grid.length;
    var dft = location.top;
    var dfl = location.left;

    if (location.left < 0 ||
        location.left >= gridSize ||
        location.top < 0 ||
        location.top >= gridSize) {

        // BOYLE BIR YER YOK
        return 'Invalid';
    } else if (grid[dft][dfl] === 'Goal') {
        return 'Goal';
    } else if (grid[dft][dfl] !== 'Empty') {
        // DAHA ONCE GIDILDI YA DA ENGEL VAR
        return 'Blocked';
    } else {
        return 'Valid';
    }
};


// BELIRTILEN YONDE KESFET
var exploreInDirection = function (currentLocation, direction, grid) {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);

    var dft = currentLocation.top;
    var dfl = currentLocation.left;

    if (direction === 'North') {
        dft -= 1;
    } else if (direction === 'East') {
        dfl += 1;
    } else if (direction === 'South') {
        dft += 1;
    } else if (direction === 'West') {
        dfl -= 1;
    }

    var newLocation = {
        top: dft,
        left: dfl,
        path: newPath,
        status: 'Unknown'
    };
    newLocation.status = locationStatus(newLocation, grid);
    // ZIYARET ETTIGINI VISITED YAP
    if (newLocation.status === 'Valid') {
        grid[newLocation.top][newLocation.left] = 'Visited';
    }

    return newLocation;
};



var size = 10;
var grid = [];
for (var i = 0; i < size; i++) {
    grid[i] = [];
    for (var j = 0; j < size; j++) {
        grid[i][j] = 'Empty';
    }
}

startPoints = [0,0];
goalPoints = [2,3];

grid[startPoints[0]][startPoints[1]] = "Start";
grid[goalPoints[0]][goalPoints[1]] = "Goal";

grid[1][1] = "Wall";
grid[1][2] = "Wall";
grid[1][3] = "Wall";
grid[2][2] = "Wall";

console.log(findShortestPath(startPoints, grid));