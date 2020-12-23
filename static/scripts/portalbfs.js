class Bfs {

    constructor(strgrid) {

        this.grid = [];

        var portalstart, portalend;
        var trgtlist = [];

        var cnt = 0;
        var portalflag = false;

        for (var x = 0, xl = strgrid.length; x < xl; x++) {
            this.grid[x] = [];
            for (var y = 0, yl = strgrid[0].length; y < yl; y++) {

                if (strgrid[x][y] == 'wall')
                    this.grid[x][y] = new Cell(x, y, true, false);

                else if (strgrid[x][y] == 'empty') {
                    this.grid[x][y] = new Cell(x, y, false, false);
                    cnt++;
                } else if (strgrid[x][y] == 'portalstart') {
                    this.grid[x][y] = new Cell(x, y, false, false);
                    portalstart = this.grid[x][y];
                    portalflag = true;
                } else if (strgrid[x][y] == 'portalend') {
                    this.grid[x][y] = new Cell(x, y, false, false);
                    portalend = this.grid[x][y];
                } else if (strgrid[x][y] == 'start') {
                    this.grid[x][y] = new Cell(x, y, false, false);
                    this.start = this.grid[x][y];
                } else if (strgrid[x][y] == 'lava')
                    this.grid[x][y] = new Cell(x, y, false, true);

                else if (strgrid[x][y] == 'goal') {
                    this.grid[x][y] = new Cell(x, y, false, false);
                    trgtlist.push(this.grid[x][y]);
                }


            }
        }

        this.targets = trgtlist;
        this.start = new Cell(0,0,false,false);
        if (!portalflag)
            this.portal = null;
        else
            this.portal = new Portal(portalstart, portalend);

        console.log("cnt: " + cnt);

    }

    search() {

        var frontier = [];
        frontier.push(this.grid[this.start.x][this.start.y]);
        this.grid[this.start.x][this.start.y].visited = true;

        var qlength = frontier.length;
        var tmplength;
        //console.log(frontier.printPQueue());

        var steps = 0;

        //while(false) {
        while (frontier.length != 0) {

            //console.log("Hello1");
            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            var currentNode = frontier.shift();
            steps++;
            //console.log("("+ currentNode.x + " " + currentNode.y + ") - f:" + currentNode.f + " - g:" + currentNode.g + " - h:" + currentNode.h);


            // target case -- result has been found, return the traced path.
            if (this.isTarget(currentNode)) {

                console.log("cost:" + currentNode.cost);
                var direction = []

                var curr = currentNode;
                var ret = [];
                while (curr.parent) {
                    ret.push(curr);
                    direction.push(this.getDirection(curr.parent, curr))
                    curr = curr.parent;
                }
                ret.push(curr);

                console.log("steps: " + steps);
                //return ret.reverse();
                return [direction.reverse(), currentNode.cost, qlength];
                //return direction.reverse();
            }

            //console.log("Hello2");
            //return null;

            // Normal case -- move currentNode from open to closed, process each of its neighbors.


            // Find all neighbors for the current node.
            var neighbors = this.neighbors(currentNode);

            for (var i = 0, il = neighbors.length; i < il; i++) {
                var neighbor = neighbors[i];

                //console.log("("+ neighbor.x + "," + neighbor.y + ")\n");

                if (neighbor.visited || neighbor.isWall || neighbor.isLava) {
                    continue;
                }


                // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                neighbor.visited = true;
                neighbor.parent = currentNode;
                neighbor.cost = currentNode.cost + 1;

                frontier.push(neighbor);

            }

            if (this.isPortal(currentNode)) {
                var portalend = this.grid[this.portal.end.x][this.portal.end.y];
                if(!portalend.visited) {
                    portalend.visited = true;
                    portalend.parent = currentNode;
                    portalend.cost = currentNode.cost + 1;
                    frontier.push(portalend);
                }
            }


            tmplength = frontier.length;

            if (tmplength > qlength)
                qlength = tmplength;
            //console.log(frontier.printPQueue());

            //console.log("Hello3");

        }


        // No result was found - empty array signifies failure to find path.
        console.log("no solution");
        return null;
    };


    neighbors(node) {
        var ret = [];
        var x = node.x;
        var y = node.y;
        var width = this.grid.length;
        var height = this.grid.length;

        //console.log("x: " + x);
        //console.log("y: " + y);
        //console.log("width: " + width);
        //console.log("height: " + height);

        // West
        if (this.grid[x - 1] && this.grid[x - 1][y]) {
            ret.push(this.grid[x - 1][y]);
        }

        // East
        if (this.grid[x + 1] && this.grid[x + 1][y]) {
            ret.push(this.grid[x + 1][y]);
        }

        // South
        if (this.grid[x] && this.grid[x][y - 1]) {
            ret.push(this.grid[x][y - 1]);
        }

        // North
        if (this.grid[x] && this.grid[x][y + 1]) {
            ret.push(this.grid[x][y + 1]);
        }


        return ret;
    };

    isTarget(cell) {

        //console.log("cell: ("+ cell.x + "," + cell.y + ")\n");


        for (var i = 0, il = this.targets.length; i < il; i++) {
            //console.log("("+ this.targets[i].x + "," + this.targets[i].y + ")\n");
            if (this.targets[i].x == cell.x && this.targets[i].y == cell.y)
                return true;
        }

        return false;
    };

    isPortal(cell) {

        if (this.portal == null)
            return false;

        if (this.portal.start.x == cell.x && this.portal.start.y == cell.y)
            return true;

        return false;
    }

    getDirection(node1, node2) {

        var x = node1.x - node2.x;
        var y = node1.y - node2.y;

        if (x == 0 && y == 1)
            return 'north'

        if (x == 0 && y == -1)
            return 'south'

        if (x == 1 && y == 0)
            return 'west'

        if (x == -1 && y == 0)
            return 'east'

        else
            return "teleport" + "-" + this.portal.end.x + "-" + this.portal.end.y;
    }


}

class Cell {

    constructor(xaxis, yaxis, wall, lava) {
        this.x = xaxis;
        this.y = yaxis;
        this.isWall = wall;
        this.cost = 0;
        this.visited = 0;
        this.parent = null;
        this.isLava = lava

    }

}

/*
class Portal{

    constructor(start, end) {
        this.start=start;
        this.end=end;
    }
}


 */