class Info {
	constructor() {
		this.icons = {
	    		"COMPUTER ENGINEERING" : '<i class="fa fa-laptop"></i>',
	    		"MECHANICAL ENGINEERING" : '<i class="fa fa-cog"></i>',
	    		"ELECTRICAL ENGINEERING" :'<i class="fa fa-bolt"></i>',
	    		"CIVIL ENGINEERING" : '<i class="fa fa-building-o"></i>',
	    };

	    this.iconsClass = {
	    		"COMPUTER ENGINEERING" : 'fa fa-laptop',
	    		"MECHANICAL ENGINEERING" : 'fa fa-cog',
	    		"ELECTRICAL ENGINEERING" :'fa fa-bolt',
	    		"CIVIL ENGINEERING" : 'fa fa-building-o',
	    };

	    this.branchDetail = {
    		'computer' : {
    			name : "COMPUTER ENGINEERING",
    			logo : "fa fa-laptop"
    		},
    		'civil' : {
    			name : "CIVIL ENGINEERING",
    			logo : "fa fa-building-o"
    		},
    		'electrical' : {
    			name : "ELECTRICAL ENGINEERING",
    			logo : "fa fa-bolt"
    		},
    		'mechanical' : {
    			name : "MECHANICAL ENGINEERING",
    			logo : "fa fa-cog"
    		}
    	};

        this.trophy = {
            1: "gold",
            2: "silver",
            3: "bronz",
        }

        this.round = this.round.bind(this);
	}

    round(point) {
        if (point) {
            return point.toFixed(2);
        } else {
            return "0.00";
        }
    }
}
export default Info;