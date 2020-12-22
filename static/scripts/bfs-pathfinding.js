//SOL USTTEN BASLA
var findShortestPath = function (coordinates, grid) {
    var top = coordinates[0];
    var left = coordinates[1];

    //HER BOLGENIN LOKASYONU VE ORAYA GETIREN PATHI VAR
    var location = {
        top: top,
        left: left,
        path: [],
        status: 'start'
    };

    //BASLANGIC NOKTASI
    var queue = [location];

    while (queue.length > 0) {  //EXPLORE EDILECEK BIR YER OLDUGU SURECE

        var currentLocation = queue.shift();    //QUEUE NUN ILK ELEMANINI AL

        // DOGUYA BAK
        var newLocation = exploreInDirection(currentLocation, 'East', grid);
        if (newLocation.status === 'goal') {
            return newLocation.path;
        } else if (newLocation.status === 'valid') {
            queue.push(newLocation);
        }

        // GUNEYE BAK
        var newLocation = exploreInDirection(currentLocation, 'South', grid);
        if (newLocation.status === 'goal') {
            return newLocation.path;
        } else if (newLocation.status === 'valid') {
            queue.push(newLocation);
        }

        // BATIYA BAK
        var newLocation = exploreInDirection(currentLocation, 'West', grid);
        if (newLocation.status === 'goal') {
            return newLocation.path;
        } else if (newLocation.status === 'valid') {
            queue.push(newLocation);
        }

        // KUZEYE BAK
        var newLocation = exploreInDirection(currentLocation, 'North', grid);
        if (newLocation.status === 'goal') {
            return newLocation.path;
        } else if (newLocation.status === 'valid') {
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
    } else if (grid[dft][dfl] === 'goal') {
        return 'goal';
    } else if (grid[dft][dfl] !== 'empty') {
        // DAHA ONCE GIDILDI YA DA ENGEL VAR
        return 'Blocked';
    } else {
        return 'valid';
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
    if (newLocation.status === 'valid') {
        grid[newLocation.top][newLocation.left] = 'Visited';
    }

    return newLocation;
};



var size = 20;
var grid = [];
for (var i = 0; i < size; i++) {
    grid[i] = [];
    for (var j = 0; j < size; j++) {
        grid[i][j] = 'empty';
    }
}

startPoints = [0,0];
goalPoints = [[19,3],[4,5]];

grid[startPoints[0]][startPoints[1]] = "start";

for (var i=0; i<goalPoints.length; i++) {
    grid[goalPoints[i][0]][goalPoints[i][1]] = "goal";
}

grid[1][1] = "wall";
grid[1][2] = "lava";
grid[1][3] = "wall";
grid[2][2] = "wall";

console.log(findShortestPath(startPoints, grid));