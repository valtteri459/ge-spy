module.exports = function(){
  return async function(hook){
    const service = hook.app.service(hook.path);
    let params
    if (hook.path === 'item-prices') {
      params = {item: hook.data.item, timestamp: hook.data.timestamp}
    } else {
      params = {id: hook.data.id}
    }
    try {
      var response = await service.get(params).catch((e) => {
      });
  
      if (response !== undefined) {
      // Set `hook.result` to skip the db call to `create` if a record was found.
        //console.log('got response, it is: ', response.data, 'hook data: ', hook.data, 'params: ', params)
        hook.result = await service.update(params, hook.data).catch(e => {
          console.log('params', params, 'response', response, 'data', hook.data, 'FOU UPDATE ERROR IS: ', e)
        });
        if (!hook.result) {
          delete hook.result
        }
      }

      // Return the `hook` object for the next hook to use.
      return hook;
    } catch (e) {
      console.log('Error from find or create hook', e, JSON.stringify(e));
      return Promise.reject({text: 'Virhe FoU koodissa', error: e, stringified: JSON.stringify(e)});
    }
  };
};