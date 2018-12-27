import Type from './Type';

const Tool = {
  CLIMBING_GEAR: 0b001,
  TORCH: 0b010,
  NEITHER: 0b100,
};

const AllowedTools = {
  [Type.ROCKY]: Tool.CLIMBING_GEAR | Tool.TORCH,
  [Type.WET]: Tool.CLIMBING_GEAR | Tool.NEITHER,
  [Type.NARROW]: Tool.TORCH | Tool.NEITHER,
};

class RegionWithTool {
  constructor(region, tool) {
    this.region = region;
    this.tool = tool;
  }

  costTowards(next) {
    if (this.region === next.region) {
      return 7;
    }
    return 1;
  }

  get label() {
    let tool = 'N';
    if (this.tool === Tool.CLIMBING_GEAR) {
      tool = 'CG';
    } else if (this.tool === Tool.TORCH) {
      tool = 'T';
    }
    return `${this.region.label} + ${tool}`;
  }

  get options() {
    const options = [];

    // Add gear changes to the list of options
    options.push(...this.region.withTools.filter(rwt => rwt !== this));

    // Add neighbors with current tool to the list of options
    this.region.neighbors.forEach((neighbor) => {
      const nwt = neighbor.withTool(this.tool);
      if (nwt) {
        options.push(nwt);
      }
    });

    return options;
  }

  static for(region) {
    const allowed = AllowedTools[region.type];
    return [
      allowed & Tool.CLIMBING_GEAR ? new this(region, Tool.CLIMBING_GEAR) : null,
      allowed & Tool.TORCH ? new this(region, Tool.TORCH) : null,
      allowed & Tool.NEITHER ? new this(region, Tool.NEITHER) : null,
    ].filter(Boolean);
  }
}

export default RegionWithTool;
export { Tool };
