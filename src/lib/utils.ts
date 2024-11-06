export function getInstanceType() {
    return process.env.INSTANCE_TYPE || 'CDC';
  }
  
  export function formatGraphResults(results: { [key: string]: unknown }[]) {
    // Implement result formatting logic here
    return results;
  }