fromParams(target, jsonObj)
{
    for(var p in target.parameters)
    {
        if(jsonObj[p] !== undefined)
        {
            target[p] = jsonObj[p];
        }
    }
}

class Camera
{
    constructor(type = "perspective", znear = 0.0, zfar = undefined, yfov = Math.PI / 4.0, aspectRatio = 16.0 / 9.0, xmag = 1.0, ymag = 1.0)
    {
        this.type = type;
        this.znear = znear;
        this.zfar = zfar;
        this.yfov = yfov; // radians
        this.xmag = xmag;
        this.ymag = ymag;
        this.aspectRatio = aspectRatio;
        this.parameters = [ "type", "znear", "zfar", "yfov", "xmag", "ymag", "aspectRatio" ];
    }


    getProjectionMatrix()
    {
        var proj = mat4.create();

        if (this.type == "perspective")
        {
            mat4.perspective(proj, this.yfov, this.aspectRatio, this.znear, this.zfar);
        }
        else if (this.type == "orthographic")
        {
            proj[0]  = 1.0 / this.xmag;
            proj[5]  = 1.0 / this.ymag;
            proj[10] = 2.0 / (this.znear / this.zfar)
            proj[14] = (this.zfar + this.znear) / (this.znear - this.zfar);
        }

        return proj;
    }

    fromJson(jsonCamera)
    {
        fromParams(this, jsonCamera);
    }
};
