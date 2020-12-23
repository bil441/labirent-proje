class Astar{

    constructor(strgrid) {

        this.grid = [];

        var portalstart, portalend;
        var trgtlist = [];

        var portalflag=false;


        for(var x = 0, xl = strgrid.length; x < xl; x++) {
            this.grid[x] = [];
            for(var y = 0, yl = strgrid[0].length; y < yl; y++) {

                if(strgrid[x][y]=='wall')
                    this.grid[x][y]= new Cell(x,y,true, false);

                else if(strgrid[x][y]=='empty'){
                    this.grid[x][y]= new Cell(x,y,false, false);
                }

                else if(strgrid[x][y]=='portalstart'){
                    this.grid[x][y]= new Cell(x,y,false, false);
                    portalstart=this.grid[x][y];
                    portalflag=true;
                }

                else if(strgrid[x][y]=='portalend'){
                    this.grid[x][y]= new Cell(x,y,false, false);
                    portalend=this.grid[x][y];
                }

                else if(strgrid[x][y]=='start'){
                    this.grid[x][y]= new Cell(x,y,false, false);
                    this.start=this.grid[x][y];
                }

                else if(strgrid[x][y]=='lava')
                    this.grid[x][y]= new Cell(x,y,false, true);

                else if(strgrid[x][y]=='goal'){
                    this.grid[x][y]= new Cell(x,y,false, false);
                    trgtlist.push(this.grid[x][y]);
                }




            }
        }

        this.targets = trgtlist;

        if (!portalflag)
            this.portal=null;
        else
            this.portal = new Portal(portalstart, portalend);


    }

    search() {


        var frontier = new PriorityQueue();
        frontier.enqueue(this.grid[this.start.x][this.start.y], 0);
        this.grid[this.start.x][this.start.y].visited = true;

        var qlength = frontier.qlength();
        var tmplength;
        //console.log(frontier.printPQueue());

        var steps=0;

        //while(false) {
        while(!frontier.isEmpty()) {

            //console.log("Hello1");
            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            var currentNode = frontier.dequeue();
            steps++;
            //console.log("("+ currentNode.x + " " + currentNode.y + ") - f:" + currentNode.f + " - g:" + currentNode.g + " - h:" + currentNode.h);


            // target case -- result has been found, return the traced path.
            if(this.isTarget(currentNode)) {

                console.log("**");
                var direction=[]

                var curr = currentNode;
                var ret = [];
                while(curr.parent) {
                    ret.push(curr);
                    direction.push(this.getDirection(curr.parent, curr))
                    curr = curr.parent;
                }
                console.log("steps: " + steps);
                //return ret.reverse();
                return [direction.reverse(), currentNode.g, tmplength];
                //return new Array(direction.reverse(), currentNode.g, tmplength);
                //return direction.reverse();
            }

            //console.log("Hello2");
            //return null;

            // Normal case -- move currentNode from open to closed, process each of its neighbors.




            // Find all neighbors for the current node.
            var neighbors = this.neighbors(currentNode);

            for(var i=0, il = neighbors.length; i < il; i++) {
                var neighbor = neighbors[i];

                //console.log("("+ neighbor.x + "," + neighbor.y + ")\n");

                if(neighbor.visited || neighbor.isWall) {
                    continue;
                }


                // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                neighbor.visited = true;
                neighbor.parent = currentNode;
                neighbor.h = this.manhattan(neighbor);
                neighbor.g = currentNode.g + neighbor.cost;
                neighbor.f = neighbor.g + neighbor.h;

                frontier.enqueue(neighbor, neighbor.f);

            }

            if(this.isPortal(currentNode)){
                var portalend = this.grid[this.portal.end.x][this.portal.end.y];
                portalend.visited = true;
                portalend.parent = currentNode;
                portalend.h = this.manhattan(portalend);
                portalend.g = currentNode.g + portalend.cost;
                portalend.f = portalend.g + portalend.h;
                frontier.enqueue(portalend, portalend.f);
            }

            tmplength=frontier.qlength();

            if(tmplength>qlength)
                qlength=tmplength;
            //console.log(frontier.printPQueue());

            //console.log("Hello3");

        }


        // No result was found - empty array signifies failure to find path.
        console.log("no solution");
        return null;
    };

    manhattan(cell) {

        //console.log("target : (" + this.targets[0].x + " " + this.targets[0].y + ")");
        //console.log("portal : (" + this.portal.end.x + " " + this.portal.end.y);

        var mindist = Infinity;
        var dist = 0;
        if(this.portal!=null){

            var portaldist= Math.abs(this.portal.start.x- cell.x) + Math.abs( this.portal.start.y - cell.y);

            for (var i=0, il=this.targets.length; i<il; i++){
                dist= Math.abs(this.targets[i].x-cell.x) + Math.abs(this.targets[i].y-cell.y);
                if(dist<mindist)
                    mindist=dist
                dist = portaldist + Math.abs(this.portal.end.x- this.targets[i].x) + Math.abs( this.portal.end.y - this.targets[i].y)+1;
                if(dist<mindist)
                    mindist=dist
            }

        }
        else {

            for (var i=0, il=this.targets.length; i<il; i++){
                dist= Math.abs(this.targets[i].x-cell.x) + Math.abs(this.targets[i].y-cell.y);
                if(dist<mindist)
                    mindist=dist
            }
        }


        return mindist;
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
        if(this.grid[x-1] && this.grid[x-1][y]) {
            ret.push(this.grid[x-1][y]);
        }

        // East
        if(this.grid[x+1] && this.grid[x+1][y]) {
            ret.push(this.grid[x+1][y]);
        }

        // South
        if(this.grid[x] && this.grid[x][y-1]) {
            ret.push(this.grid[x][y-1]);
        }

        // North
        if(this.grid[x] && this.grid[x][y+1]) {
            ret.push(this.grid[x][y+1]);
        }



        return ret;
    };

    isTarget(cell){

        //console.log("cell: ("+ cell.x + "," + cell.y + ")\n");


        for(var i=0, il=this.targets.length; i<il; i++){
            //console.log("("+ this.targets[i].x + "," + this.targets[i].y + ")\n");
            if(this.targets[i].x==cell.x && this.targets[i].y==cell.y)
                return true;
        }

        return false;
    };

    isPortal(cell){

        if(this.portal==null)
            return false;

        if(this.portal.start.x==cell.x && this.portal.start.y==cell.y)
            return true;

        return false;
    }

    getDirection(node1, node2){

        var x= node1.x - node2.x;
        var y= node1.y - node2.y;

        if(x==0 && y==1)
            return 'north'

        if(x==0 && y==-1)
            return 'south'

        if(x==1 && y==0)
            return 'west'

        if(x==-1 && y==0)
            return 'east'

        else
            return  "teleport-" + this.portal.end.x + "-" + this.portal.end.y;
    }



}

class Cell{

    constructor(xaxis, yaxis, wall, lava) {
        this.x=xaxis;
        this.y=yaxis;
        this.isWall=wall;
        this.f=0;
        this.g=0;
        this.h=0;
        this.visited=0;
        this.parent = null;
        this.isLava = lava

        if (lava)
            this.cost=10;
        else
            this.cost=1;
    }

}


class Portal{

    constructor(start, end) {
        this.start=start;
        this.end=end;
    }
}
