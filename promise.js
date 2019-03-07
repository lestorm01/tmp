let Promise = class {
    constructor(executor)
    {
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks=[]
        this.onRejectedCallbacks=[]

        let resolve = (data) => {
            if (this.status === 'pending') {
                this.value = data
                this.status = 'resolved'
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }

        let reject = (reason) => {
            if (this.status === 'pending'){
                this.reason = reason
                this.status = 'rejected'
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }

    }

    then(onFulFilled, onRejected)
    {
        if (this.status === 'resolved') {
            onFulFilled(this.value)
        }
        if (this.status === 'rejected') {
            onRejected(this.reason)
        }
        if(this.status==='pending'){
            this.onResolvedCallbacks.push(()=>{
                onFulFilled(this.value)

            })

            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason)
            })
        }

    }
}

module.exports = Promise

