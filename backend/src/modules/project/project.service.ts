import { Project } from './project.entity';

export default class ProjectService {
  public static create = async (data: Project) => {
    const project = Project.save(data);
    return project;
  };

  public static update = async (data: any, id: string) => {
    const result = await Project.createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const returnedProject = result.raw[0];

    const project = Project.create({
      id: returnedProject.id,
      name: returnedProject.name,
      description: returnedProject.description,
      userId: returnedProject.user_id,
    });

    return project;
  };

  public static delete = async (id: string) => {
    await Project.delete({ id });
    return true;
  };

  public static findById = async (id: string) => {
    const project = await Project.findOneBy({ id });
    return project;
  };

  public static findByUserId = async (userId: string) => {
    const projects = await Project.findBy({ userId });
    return projects;
  };
}
