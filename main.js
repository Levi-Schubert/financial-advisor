function advisor(comp, spec, name) {
	let stocks = []
	let history = []
	return Object.create({},{
		company:
			{
				value: comp,
				enumerable: true,
				writable: true	
			},
		specialty:
			{
				value: spec,
				enumerable:true,
				writable:true
			},
		name:
			{
				value: name,
				enumerable: true,
				writable: false
			},
		portfolio:
			{
				value: stocks,
				enumerable:false,
				writable:true
			},
		worth:
			{
				value: 
					function (){
						let total = 0
						this.portfolio.forEach(iter => {
							total += (iter.buyPrice * iter.currentAmount)
							iter.history.forEach(transaction => {
								if(transaction.bought == false){
									total += transaction.amount * transaction.price
								}
							});
						});
						console.log(this.name +"'s total worth is: $" + total)
					},
				enumerable:false,
				writable:false
			},
		purchase:
			{
				value: 
					function (name, amount, value){
						//check to see if stock has already been bought before
						let currentStock
						let iter = 0
						let found = false
						this.portfolio.forEach(find => {
							if(find.stock == name){
								found = true
							}
							if(!found){
								iter += 1
							}
						})
						currentStock = this.portfolio[iter]
						//if not create new stock for the array
						if(!found){
							let history = []
							let stockObj = Object.create({},{
								stock:
									{
										value: name,
										enumerable: true,
										writable: false
									},
								bought:
									{
										value: amount,
										enumerable: true,
										writable: true
									},
								buyPrice:
									{
										value: value,
										enumerable: true,
										writable: true
									},
								currentAmount:
									{
										value: amount,
										enumerable: true,
										writable: true
									},
								history:
									{
										value: history,
										enumerable: true,
										writable:true
									}
							})
							this.portfolio.push(stockObj)

							currentStock = this.portfolio[(this.portfolio.length-1)]
							}else{
								//if found only add the current amount
								currentStock.currentAmount += amount
							}
							//if created or added to add the transaction to the history
								currentStock.history.push(Object.create({},{
								bought:
									{
										value: true, //using true or false for this value for easier logic later exists to say if it was bought or sold for calculation purposes
										enumerable: true,
										writable: false
									},
								amount:
									{
										value: amount,
										enumerable: true,
										writable: false
									},
								price:
									{
										value: value,
										enumerable: true,
										writable: false
									}
							}))
						
					},
				enumerable:false,
				writable: false
			},
		sell:
		{
			value: 
				function (name, amount, value){
					let currentStock
					let iter = 0
					let found = false
					this.portfolio.forEach(find => {

						if(!found){
							if(find.stock == name){
								if(!(amount > find.currentAmount)){
									found = true
								}
							}
						}
						if(!found){
							iter += 1
						}
						
					})
					if(!found){
						console.log("Not enough of this stock to sell")
					}else{
						currentStock = this.portfolio[iter]
						
						currentStock.currentAmount -= amount
						
						currentStock.history.push(Object.create({},{
							bought:
								{
									value: false, //using true or false for this value for easier logic later exists to say if it was bought or sold for calculation purposes
									enumerable: true,
									writable: false
								},
							amount:
								{
									value: amount,
									enumerable: true,
									writable: false
								},
							price:
								{
									value: value,
									enumerable: true,
									writable: false
								}
						}))
					}
				},
			enumerable:false,
			writable: false
		},
	
	})

}

let david = advisor("NSS", "developer", "John Smith")
david.purchase("MSFT",50, 100)
david.purchase("APPL", 100, 200)
david.purchase("MSFT", 100, 150)
david.sell("MSFT", 50, 100)
david.sell("APPL", 100, 150)
david.worth()
